package pzlegends.com.pzlegends.service;

import jakarta.mail.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pzlegends.com.pzlegends.config.ApiException;
import pzlegends.com.pzlegends.model.User;
import pzlegends.com.pzlegends.model.UserConfirmation;
import pzlegends.com.pzlegends.model.UserPassword;
import pzlegends.com.pzlegends.model.dto.CreateAccountDTO;
import pzlegends.com.pzlegends.model.dto.UserConfirmationDTO;
import pzlegends.com.pzlegends.model.enums.UserStatusEnum;
import pzlegends.com.pzlegends.repository.UserConfirmationRepository;
import pzlegends.com.pzlegends.repository.UserPasswordRepository;
import pzlegends.com.pzlegends.repository.UserRepository;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPasswordRepository userPasswordRepository;

    @Autowired
    private UserConfirmationRepository userConfirmationRepository;

    @Autowired
    private JavaMailSender emailSender;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

    public User findById(Long userId) {
        return userRepository.findById(userId).get();
    }

    public User newAccount(CreateAccountDTO account) {
        validateUser(account);

        var encryptedPassword = genPassword(account.getPassword());

        User user = new User(account.getUsername(), account.getEmail());

        userRepository.save(user);
        UserPassword userPassword = new UserPassword(user.getId(), encryptedPassword);
        userPasswordRepository.save(userPassword);


        var code = sendEmailConfirmation(user.getEmail());

        userConfirmationRepository.save(new UserConfirmation(user, code));

        return user;
    }

    private void validateUser(CreateAccountDTO account) {
        if (account.getUsername().isEmpty() || account.getEmail().isEmpty() || account.getPassword().isEmpty())
            throw new ApiException(HttpStatus.CONFLICT, "dataEmpty");

        if (userRepository.findByUsername(account.getUsername()).isPresent())
            throw new ApiException(HttpStatus.CONFLICT, "usernameAlreadyExist");

        if (userRepository.findByEmail(account.getEmail()).isPresent())
            throw new ApiException(HttpStatus.CONFLICT, "emailAlreadyExist");
    }

    private String genPassword(String password){
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        byte[] messageDigest = md.digest(password.getBytes());
        BigInteger number = new BigInteger(1, messageDigest);
        return number.toString(16);
    }

    private String sendEmailConfirmation(String email){

        SimpleMailMessage message = new SimpleMailMessage();

        var code = getRandomNumberString();

        message.setFrom("pzlegends@outlook.com");
        message.setTo(email);
        message.setSubject("Confirmação de email: " + code);
        message.setText("Seu código para confirmação de conta é: ");

        emailSender.send(message);

        return code;
    }

    private static String getRandomNumberString() {
        Random rnd = new Random();
        int number = rnd.nextInt(999999);

        return String.format("%06d", number);
    }

    public User confirmEmail(UserConfirmationDTO userConfirmationDTO){
        if (userConfirmationDTO.getUserId() == null || userConfirmationDTO.getCode().isEmpty()) throw new ApiException(HttpStatus.BAD_REQUEST, "badRequest");

        var x = userConfirmationRepository.findByUserId(userConfirmationDTO.getUserId());

        if (x.isEmpty()) throw new ApiException(HttpStatus.BAD_REQUEST, "badRequest");

        if (x.get().getTries().equals(5L)) {
            userRepository.delete(x.get().getUser());
            throw new ApiException(HttpStatus.UNAUTHORIZED, "createNewAccount");
        }

        if (!x.get().getCode().equals(userConfirmationDTO.getCode())) {

            x.get().setTries(x.get().getTries() + 1L);

            userConfirmationRepository.save(x.get());

            throw new ApiException(HttpStatus.BAD_REQUEST, "invalidCode");
        }

        x.get().getUser().setStatus(UserStatusEnum.ACTIVE);

        userRepository.save(x.get().getUser());
        userConfirmationRepository.delete(x.get());

        return null;
    }
}
