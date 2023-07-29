package pzlegends.com.pzlegends.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pzlegends.com.pzlegends.model.dto.RunDTO;
import pzlegends.com.pzlegends.service.RunService;

@RestController
@RequestMapping("/run")
public class RunController {

    @Autowired
    private RunService runService;

    @GetMapping("{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(runService.findById(id));
    }

}
