package pzlegends.com.pzlegends.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pzlegends.com.pzlegends.config.ApiException;
import pzlegends.com.pzlegends.model.RunReport;
import pzlegends.com.pzlegends.model.dto.RunReportDTO;
import pzlegends.com.pzlegends.repository.RunReportRepository;

@Service
public class RunReportService {

    @Autowired
    private RunReportRepository runReportRepository;

    public RunReport newReport(RunReportDTO runReport) {
        if (runReport.getReportBy() == null || runReport.getRunId() == null || runReport.getMessage() == null) throw new ApiException(HttpStatus.CONFLICT, "dataIncomplete");
        return runReportRepository.save(new RunReport(runReport.getRunId(), runReport.getReportBy(), runReport.getMessage()));
    }
}
