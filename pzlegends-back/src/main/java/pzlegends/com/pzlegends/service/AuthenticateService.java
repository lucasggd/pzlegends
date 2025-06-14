package pzlegends.com.pzlegends.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pzlegends.com.pzlegends.model.User;
import pzlegends.com.pzlegends.model.UserPassword;
import pzlegends.com.pzlegends.model.enums.UserTypeEnum;
import pzlegends.com.pzlegends.repository.UserPasswordRepository;
import pzlegends.com.pzlegends.repository.UserRepository;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

@Service
public class AuthenticateService {

    private static final String SECRET_KEY = "y3BcEdH3MbQeShVmYq3t6w9zGCCF3JDNcRfUjWnZr4u7xcAsDhhLKaPdSgVkYp2sy3BcEdH3MbQeShVmYq3t6w9zGCCF3JDNcRfUjWnZr4u7xcAsDhhLKaPdSgVkYp2s";

    @Autowired
    private UserPasswordRepository repository;

    public HashMap<String, String> authenticate(String username, String password) {
        if (username == null || password == null) return null;

        Optional<UserPassword> user = this.repository.findByUserUsernameAndPassword(username, passwordToMD5(password));

        if (user.isEmpty()) return null;

        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("t", generateToken(user.get().getId(), user.get().getUser().getUsername(), user.get().getUser().getUserType()));

        return hashMap;

    }

    private String passwordToMD5(String password) {
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

    private static String generateToken(Long userId, String username, UserTypeEnum userType) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 3600000);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .claim("id", userId)
                .claim("username", username)
                .claim("userType", userType)
                .compact();
    }
}
