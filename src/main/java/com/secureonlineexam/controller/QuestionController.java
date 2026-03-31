package com.secureonlineexam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.secureonlineexam.dto.QuestionRequest;
import com.secureonlineexam.model.Exam;
import com.secureonlineexam.model.Question;
import com.secureonlineexam.service.ExamService;
import com.secureonlineexam.service.QuestionService;

@RestController
@RequestMapping("/question")
public class QuestionController {

    private final QuestionService questionService;
    private final ExamService examService;

    public QuestionController(QuestionService questionService, ExamService examService) {
        this.questionService = questionService;
        this.examService = examService;
    }
   

    @PostMapping("/create/{examId}")
    public Question createQuestion(
            @PathVariable Long examId,
            @RequestBody Question question) {

        Exam exam = examService.getExamById(examId);
        question.setExam(exam);

        return questionService.saveQuestion(question);
    }
    @PostMapping("/create-multiple")
    public String createMultipleQuestions(@RequestBody QuestionRequest request) {
        Exam exam = examService.getExamById(request.getExamId());

        for (QuestionRequest.QuestionData qData : request.getQuestions()) {
            Question question = new Question();
            question.setQuestionText(qData.getQuestionText());
            question.setOptionA(qData.getOptionA());
            question.setOptionB(qData.getOptionB());
            question.setOptionC(qData.getOptionC());
            question.setOptionD(qData.getOptionD());
            question.setCorrectAnswer(qData.getCorrectAnswer());
            question.setExam(exam);
            questionService.saveQuestion(question);
        }

        return "All questions added successfully!";
    }
    @GetMapping("/exam/{examId}")
    public List<Question> getQuestionsByExam(@PathVariable Long examId) {
        return questionService.getQuestionsByExamId(examId);
    }
    @PostMapping("/add")
    public ResponseEntity<?> addQuestion(@RequestBody Question question) {

        Long examId = question.getExam().getId(); // Get exam ID from request

        if (examId == null) {
            return ResponseEntity.badRequest().body("Exam ID is missing!");
        }

        // Fetch exam from DB
        Exam exam = examService.getExamById(examId);
        if (exam == null) {
            return ResponseEntity.badRequest().body("Exam not found!");
        }

        // Set the exam in question
        question.setExam(exam);

        // Save question
        Question savedQuestion = questionService.saveQuestion(question);

        return ResponseEntity.ok(savedQuestion);
    }

@PutMapping("/update/{id}")
public Question updateQuestion(@PathVariable Long id, @RequestBody Question q){
    q.setId(id);
    return questionService.saveQuestion(q);
}
@DeleteMapping("/delete/{id}")
public ResponseEntity<?> deleteQuestion(@PathVariable Long id){
    questionService.deleteById(id);
    return ResponseEntity.ok("Deleted");
}

}
