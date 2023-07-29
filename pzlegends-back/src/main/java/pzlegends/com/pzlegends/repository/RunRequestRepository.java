package pzlegends.com.pzlegends.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pzlegends.com.pzlegends.model.RunRequest;
import pzlegends.com.pzlegends.model.enums.RunRequestStatusEnum;

import java.util.List;

@Repository
public interface RunRequestRepository extends JpaRepository<RunRequest, Long> {
    List<RunRequest> findByUserIdAndCategoryIdAndRunRequestStatus(Long userId, Long categoryId, RunRequestStatusEnum status);

}
