	package com.secureonlineexam.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.secureonlineexam.model.Exam;
import com.secureonlineexam.model.Question;
import com.secureonlineexam.repository.ExamRepository;

import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;

@Service
public class ExamService {

    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public Exam saveExam(Exam exam) {
        return examRepository.save(exam);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Exam getExamById(Long id) {
        return examRepository.findById(id).orElse(null);
    }
    public void deleteById(Long id){
        examRepository.deleteById(id);
    }
    //public Exam getLatestExam(){
        //return examRepository.findTopByOrderByIdDesc();
   // }
}