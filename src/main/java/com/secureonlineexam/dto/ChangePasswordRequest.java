package com.secureonlineexam.dto;



public class ChangePasswordRequest {

    private String name;
    private String rollNumber;
    private String oldPassword;
    private String newPassword;
    private String role;

    public String getName() {
        return name;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public String getRole() {
        return role;
    }
}