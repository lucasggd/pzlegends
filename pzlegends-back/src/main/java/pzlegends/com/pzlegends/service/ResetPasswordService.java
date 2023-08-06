package pzlegends.com.pzlegends.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pzlegends.com.pzlegends.model.ResetPassword;
import pzlegends.com.pzlegends.repository.ResetPasswordRepository;

import java.util.Optional;

@Service
public class ResetPasswordService {

    @Autowired
    private ResetPasswordRepository repository;

    public ResetPassword save(ResetPassword resetPassword){
        return repository.save(resetPassword);
    }

    public Optional<ResetPassword> findByEmailAndCode(String email, String code){
        return repository.findByEmailAndCode(email, code);
    }

    public void deleteReset(ResetPassword resetPassword) {
        repository.delete(resetPassword);
    }
}
