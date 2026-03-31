package com.secureonlineexam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.secureonlineexam.dto.SubmissionRequest;
import com.secureonlineexam.model.Result;
import com.secureonlineexam.service.ResultService;
import java.util.List;

@RestController
@RequestMapping("/results")
@CrossOrigin("*")
public class ResultController {

    @Autowired
    private ResultService resultService;

    // save result//changed
    //@PostMapping("/submit")
   // public Result submitResult(@RequestBody Result result) {
   //     return resultService.saveResult(result);
  @PostMapping("/submit")
    public Result submitResult(@RequestBody SubmissionRequest submission) {
        return resultService.calculateAndSaveResult(submission);
    }  

    // teacher view results
    @GetMapping("/{examId}")
    public List<Result> getResults(@PathVariable int examId) {
        return resultService.getResultsByExamId(examId);
    }

    // check already attempted
    @GetMapping("/attempted/{roll}/{examId}")
    public boolean checkAttempt(@PathVariable String roll,
                                @PathVariable int examId) {

        return resultService.alreadyAttempted(roll, examId);
    }
    @DeleteMapping("/retake/{roll}/{examId}")
    public String allowRetake(@PathVariable String roll,
                            @PathVariable int examId) {

        resultService.allowRetake(roll, examId);
        return "success";
    }
}