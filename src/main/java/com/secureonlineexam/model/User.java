package com.secureonlineexam.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "uuser")  // make sure table name matches your DB
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String password;
    private String role;

    @Column(name = "roll_no")  // maps rollNumber -> roll_no
    private String rollNumber;

    @Column(name = "password_changed") // maps passwordChanged -> password_changed
    private boolean passwordChanged;

    // ========================
    // Getters and Setters
    // ========================
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

   public String getRollNumber() {
      return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
       this.rollNumber = rollNumber;
    }

    public boolean isPasswordChanged() {
        return passwordChanged;
  }

   public void setPasswordChanged(boolean passwordChanged) {
       this.passwordChanged = passwordChanged;
    }

}