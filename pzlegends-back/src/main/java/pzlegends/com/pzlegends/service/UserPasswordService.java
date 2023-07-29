package pzlegends.com.pzlegends.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pzlegends.com.pzlegends.model.UserPassword;
import pzlegends.com.pzlegends.repository.UserPasswordRepository;

@Service
public class UserPasswordService {

    @Autowired
    private UserPasswordRepository userPasswordRepository;

    public void newPassword(Long userId, String password){
        userPasswordRepository.save(new UserPassword(userId, password));
    }
}
