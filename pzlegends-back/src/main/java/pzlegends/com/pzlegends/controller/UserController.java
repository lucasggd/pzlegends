package pzlegends.com.pzlegends.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pzlegends.com.pzlegends.model.User;
import pzlegends.com.pzlegends.model.dto.CreateAccountDTO;
import pzlegends.com.pzlegends.model.dto.RunReportDTO;
import pzlegends.com.pzlegends.model.dto.UserConfirmationDTO;
import pzlegends.com.pzlegends.model.dto.UserDTO;
import pzlegends.com.pzlegends.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("create-account")
    private ResponseEntity<?> createAccount(@RequestBody CreateAccountDTO user) throws Exception {
        return new ResponseEntity<>(userService.newAccount(user), HttpStatus.CREATED);
    }

    @PostMapping("confirmation")
    private ResponseEntity<?> confirmEmail(@RequestBody UserConfirmationDTO userConfirmationDTO) throws Exception {
        return new ResponseEntity<>(userService.confirmEmail(userConfirmationDTO), HttpStatus.CREATED);
    }

}
