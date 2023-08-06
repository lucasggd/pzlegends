package pzlegends.com.pzlegends.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pzlegends.com.pzlegends.model.RunRequest;
import pzlegends.com.pzlegends.model.enums.RunRequestStatusEnum;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface RunRequestRepository extends JpaRepository<RunRequest, Long> {
    List<RunRequest> findByUserIdAndCategoryIdAndRunRequestStatus(Long userId, Long categoryId, RunRequestStatusEnum status);

    Page<RunRequest> findAllByOrderByIdDesc(PageRequest pageable);

}
