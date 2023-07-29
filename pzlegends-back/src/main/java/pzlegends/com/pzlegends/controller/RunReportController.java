package pzlegends.com.pzlegends.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pzlegends.com.pzlegends.model.RunReport;
import pzlegends.com.pzlegends.model.dto.RunDTO;
import pzlegends.com.pzlegends.model.dto.RunReportDTO;
import pzlegends.com.pzlegends.service.RunReportService;

@RestController
@RequestMapping("/run/report")
public class RunReportController {

    @Autowired
    private RunReportService runReportService;

    @PostMapping("")
    private ResponseEntity<?> newReport(@RequestBody RunReportDTO runReport) throws Exception {
        return new ResponseEntity<>(runReportService.newReport(runReport), HttpStatus.CREATED);
    }

}
