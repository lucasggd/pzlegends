package pzlegends.com.pzlegends.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pzlegends.com.pzlegends.model.User;
import pzlegends.com.pzlegends.model.UserPassword;

import java.util.Optional;

@Repository
public interface UserPasswordRepository extends JpaRepository<UserPassword, Long> {

    Optional<UserPassword> findByUserUsernameAndPassword(String username, String password);

    Optional<UserPassword> findByUserId(Long id);

}
