package com.secureonlineexam.controller;

import com.secureonlineexam.model.User;
import com.secureonlineexam.dto.ChangePasswordRequest;
import com.secureonlineexam.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ LOGIN
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User request) {

        User user = userService.login(
                request.getName(),
                request.getRollNumber(),
                request.getPassword(),
                request.getRole()
        );

        Map<String, Object> response = new HashMap<>();

        if (user != null) {
            response.put("status", "success");
            response.put("name", user.getName());
            response.put("rollNumber", user.getRollNumber());
            response.put("role", user.getRole());
        } else {
            response.put("status", "fail");
        }

        return response;
    }

    // ✅ CHANGE PASSWORD
    @PostMapping("/changePassword")
    public Map<String, String> changePassword(
            @RequestBody ChangePasswordRequest request) {

        boolean updated = userService.changePassword(
                request.getName(),
                request.getRollNumber(),
                request.getRole(),
                request.getOldPassword(),
                request.getNewPassword()
        );

        Map<String, String> response = new HashMap<>();

        if (updated) {
            response.put("status", "success");
            response.put("message", "Password changed successfully");
        } else {
            response.put("status", "fail");
            response.put("message", "Old password incorrect or user not found");
        }

        return response;
    }
    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {

        userService.register(user);

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "User registered successfully");

        return response;
    }

}