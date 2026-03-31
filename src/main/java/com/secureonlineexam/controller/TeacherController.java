package com.secureonlineexam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.secureonlineexam.model.Exam;
import com.secureonlineexam.model.Question;
import com.secureonlineexam.repository.ExamRepository;
import com.secureonlineexam.repository.QuestionRepository;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private QuestionRepository questionRepository;


    @GetMapping("/dashboard")
    public String teacherDashboard() {
        return "Welcome Teacher! This is Teacher dashboard";
    }


    @PostMapping("/add-question/{examId}")
    public Question addQuestion(@PathVariable Long examId,
                                @RequestBody Question question) {

        Exam exam = examRepository.findById(examId).orElseThrow();

        question.setExam(exam);

        return questionRepository.save(question);
    }

}
