package com.secureonlineexam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.secureonlineexam.dto.SubmissionRequest;
import com.secureonlineexam.model.Question;
import com.secureonlineexam.model.Result;
import com.secureonlineexam.repository.QuestionRepository;
import com.secureonlineexam.repository.ResultRepository;

import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;
@Autowired
private QuestionRepository questionRepository;
    public Result saveResult(Result result) {
        return resultRepository.save(result);
    }

    public List<Result> getResultsByExamId(int examId) {
        return resultRepository.findByExamId(examId);
    }

   // public boolean alreadyAttempted(String roll, int examId) {
       // return resultRepository
            //    .findByRollNumberAndExamId(roll, examId) != null;
  //  }
    public boolean alreadyAttempted(String roll, int examId) {

        List<Result> resultList =
                resultRepository.findByRollNumberAndExamId(roll, examId);

        if(resultList.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }
   // public void allowRetake(String roll, int examId) {

        //Result result = resultRepository
           //     .findByRollNumberAndExamId(roll, examId);

       // if(result != null){
         //   resultRepository.delete(result);
     //   } else {
           // System.out.println("Result not found");
    //    }
  //  }
   @Transactional
    public void allowRetake(String roll, int examId) {

        List<Result> results = resultRepository
                .findByRollNumberAndExamId(roll, examId);

        if(results.isEmpty()) {
            throw new RuntimeException("Result not found");
        }

        resultRepository.deleteByRollNumberAndExamId(roll, examId);
    }

/*public Result calculateAndSaveResult(SubmissionRequest submission) {
    int score = 0;

    for(SubmissionRequest.AnswerDTO ans : submission.getAnswers()) {
      
		Question q = questionRepository.findById(ans.getQuestionId()).orElse(null);
        if(q != null && ans.getSelectedOption() != null) {
            if(ans.getSelectedOption().equalsIgnoreCase(q.getCorrectAnswer())) {
                score++;
            }
        }
    }

    Result result = new Result();
    result.setName(submission.getName());
    result.setRollNumber(submission.getRollNumber());
    result.setExamId(submission.getExamId());
    result.setScore(score);

    return resultRepository.save(result);
}*/
   public Result calculateAndSaveResult(SubmissionRequest submission) {

	    int score = 0;

	    for (SubmissionRequest.AnswerDTO ans : submission.getAnswers()) {

	        Question q = questionRepository
	                .findById(ans.getQuestionId())
	                .orElse(null);

	        if (q != null && ans.getSelectedOption() != null) {

	            if (ans.getSelectedOption()
	                    .equalsIgnoreCase(q.getCorrectAnswer())) {

	                score++;
	            }
	        }
	    }

	    // 🔥 delete old result first
	    resultRepository.deleteByRollNumberAndExamId(
	            submission.getRollNumber(),
	            submission.getExamId()
	    );

	    Result result = new Result();

	    result.setName(submission.getName());
	    result.setRollNumber(submission.getRollNumber());
	    result.setExamId(submission.getExamId());
	    result.setScore(score);

	    return resultRepository.save(result);
	}
}