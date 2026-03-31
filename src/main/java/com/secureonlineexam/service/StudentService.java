package com.secureonlineexam.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.secureonlineexam.model.Student;
import com.secureonlineexam.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public Student save(Student student) {
        return repo.save(student);
    }

    public Student getById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public List<Student> getAll() {
        return repo.findAll();
    }
}