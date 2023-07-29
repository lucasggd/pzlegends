package pzlegends.com.pzlegends.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pzlegends.com.pzlegends.model.User;
import pzlegends.com.pzlegends.model.dto.UserDTO;
import pzlegends.com.pzlegends.service.AuthenticateService;

@Controller
@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {

    @Autowired
    private AuthenticateService service;
    @PostMapping("")
    private ResponseEntity<?> login(@RequestBody UserDTO user) {
        return new ResponseEntity<>(service.authenticate(user.getUsername(), user.getPassword()), HttpStatus.CREATED);
    }
}
