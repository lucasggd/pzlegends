package pzlegends.com.pzlegends.service;

import jakarta.mail.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pzlegends.com.pzlegends.config.ApiException;
import pzlegends.com.pzlegends.model.ResetPassword;
import pzlegends.com.pzlegends.model.User;
import pzlegends.com.pzlegends.model.UserConfirmation;
import pzlegends.com.pzlegends.model.UserPassword;
import pzlegends.com.pzlegends.model.dto.CreateAccountDTO;
import pzlegends.com.pzlegends.model.dto.ResetPasswordDTO;
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
    private ResetPasswordService resetPasswordService;

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

        var code = getRandomNumberString() ;
        String text = "Seja bem-vindo ao Pzlegends, é uma honra ter você conosco. :) \n \nSeu código para confirmação de conta é: " + code;

        sendEmailConfirmation(user.getEmail(), "Confirmação de email conta Pzlegends", text);

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

    private void sendEmailConfirmation(String email, String subject, String text){

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("pzlegends@outlook.com");
        message.setTo(email);
        message.setSubject(subject);
        message.setText(text);

        emailSender.send(message);

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

    public User sendResetPassword(String email) {
        var user = userRepository.findByEmail(email);

        if (user.isEmpty()) return null;

        var code = getRandomNumberString() ;

        resetPasswordService.save(new ResetPassword(email, code));

        String text = "\n \nPara redefinir sua senha acesse: https://pzlegends.com/reset/" + email + "/" + code;

        sendEmailConfirmation(user.get().getEmail(), "Redefinir senha conta Pzlegends", text);

        return null;
    }

    public User resetPassword(ResetPasswordDTO resetPasswordDTO) {
        if (resetPasswordDTO.getEmail().isEmpty() || resetPasswordDTO.getCode().isEmpty() || resetPasswordDTO.getPassword().isEmpty()) throw new ApiException(HttpStatus.CONFLICT, "");

        var resetPassword = resetPasswordService.findByEmailAndCode(resetPasswordDTO.getEmail(), resetPasswordDTO.getCode());

        if (resetPassword.isEmpty()) throw new ApiException(HttpStatus.CONFLICT, "");

        var user = userRepository.findByEmail(resetPasswordDTO.getEmail());

        var userPassword = userPasswordRepository.findByUserId(user.get().getId());
        userPassword.get().setPassword(genPassword(resetPasswordDTO.getPassword()));

        userPasswordRepository.save(userPassword.get());
        resetPasswordService.deleteReset(resetPassword.get());

        return null;
    }
}
