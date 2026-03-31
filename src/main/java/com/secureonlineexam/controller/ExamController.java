package com.secureonlineexam.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.secureonlineexam.model.Exam;

import com.secureonlineexam.service.ExamService;
import java.util.List;


@RestController
@RequestMapping("/exam")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping("/create")
    public Exam createExam(@RequestBody Exam exam) {
        return examService.saveExam(exam);
    }
    @GetMapping("/all")
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }
    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable Long id) {
        return examService.getExamById(id);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable Long id){
        examService.deleteById(id);
        return ResponseEntity.ok("Exam Deleted");
    }
    
    
   //adding
   // @GetMapping("/latest")
    //Public Exam getLatestExam(){
       // return examService.getLatestExam();
   // }
}