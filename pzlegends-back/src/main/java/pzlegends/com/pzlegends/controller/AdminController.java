package pzlegends.com.pzlegends.controller;

import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pzlegends.com.pzlegends.model.dto.RequestResponseDTO;
import pzlegends.com.pzlegends.service.RunReportService;
import pzlegends.com.pzlegends.service.RunRequestService;

@RestController
@RequestMapping("admin")
public class AdminController {
    @Autowired
    private RunRequestService runRequestService;

    @Autowired
    private RunReportService runReportService;

    @GetMapping("/run/request")
    private ResponseEntity<?> findAllRunRequest(@PathParam("page") Integer page, @PathParam("limit") Integer limit) {
        return new ResponseEntity<>(runRequestService.findAll(page, limit), HttpStatus.OK);
    }

    @GetMapping("/run/report")
    private ResponseEntity<?> findAllRunReport() {
        return new ResponseEntity<>(runReportService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/run/request/{id}")
    private ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(runRequestService.findById(id), HttpStatus.OK);
    }
    @PostMapping("/run/request/{id}/response")
    private ResponseEntity<?> newRequest(@PathVariable("id") Long id, @RequestBody RequestResponseDTO requestResponseDTO) throws Exception {
        return new ResponseEntity<>(runRequestService.response(id, requestResponseDTO), HttpStatus.CREATED);
    }
}
