package pzlegends.com.pzlegends.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pzlegends.com.pzlegends.model.RunReport;

@Repository
public interface RunReportRepository extends JpaRepository<RunReport, Long> {
}
