package com.secureonlineexam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.secureonlineexam.model.User;
import com.secureonlineexam.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User login(String name, String rollNumber, String password, String role) {

        User user = null;

        if (role.equalsIgnoreCase("student")) {

            user = userRepository.findByNameAndRollNumberAndRole(
                    name,
                    rollNumber,
                    role
            );

        } else if (role.equalsIgnoreCase("teacher")) {

            user = userRepository.findByNameAndRole(
                    name,
                    role
            );
        }

        if (user == null) {
            return null;
        }

        // ✅ password check
        if (!user.getPassword().equals(password)) {
            return null;
        }

        return user;
    }


    // Register user
    public User register(User user) {
        user.setPasswordChanged(false);
        return userRepository.save(user);
    }
    public boolean changePassword(
            String name,
            String rollNumber,
            String role,
            String oldPassword,
            String newPassword) {

        User user = null;

        if (role.equalsIgnoreCase("student")) {
            user = userRepository.findByRollNumberAndRole(rollNumber, role);
        } 
        else if (role.equalsIgnoreCase("teacher")) {
            user = userRepository.findByNameAndRole(name, role);
        }

        if (user != null && user.getPassword().equals(oldPassword)) {

            user.setPassword(newPassword);
            userRepository.save(user);
            return true;
        }

        return false;
    }
}