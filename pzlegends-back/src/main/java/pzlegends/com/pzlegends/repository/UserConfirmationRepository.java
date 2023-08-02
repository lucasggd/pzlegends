package pzlegends.com.pzlegends.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pzlegends.com.pzlegends.model.UserConfirmation;

import java.util.Optional;

public interface UserConfirmationRepository extends JpaRepository<UserConfirmation, Long> {

    Optional<UserConfirmation> findByUserId(Long userId);
}
