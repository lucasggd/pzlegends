package pzlegends.com.pzlegends.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pzlegends.com.pzlegends.model.RunRequest;
import pzlegends.com.pzlegends.model.dto.RunDTO;
import pzlegends.com.pzlegends.service.RunRequestService;

@RestController
@RequestMapping("/run/request")
public class RunRequestController {

    @Autowired
    private RunRequestService runRequestService;

    @PostMapping("")
    private ResponseEntity<?> newRequest(@RequestBody RunDTO runRequest) throws Exception {
        return new ResponseEntity<>(runRequestService.newRequest(runRequest), HttpStatus.CREATED);
    }

}
