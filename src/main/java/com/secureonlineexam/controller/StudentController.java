package com.secureonlineexam.controller;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import com.secureonlineexam.model.Exam;
import com.secureonlineexam.service.StudentService;
@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/dashboard")
    public String studentDashboard() {
        return "Welcome Student! This is Student dashboard";
    }

    @GetMapping("/{id}/exams")
    public List<Exam> getStudentExams(@PathVariable Long id) {
        return studentService.getById(id).getExams();
    }
}