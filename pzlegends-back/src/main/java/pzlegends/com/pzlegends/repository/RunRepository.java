package pzlegends.com.pzlegends.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pzlegends.com.pzlegends.model.Run;

import java.util.List;

@Repository
public interface RunRepository extends JpaRepository<Run, Long> {
    List<Run> findAllByCategoryId(Long id);
}
