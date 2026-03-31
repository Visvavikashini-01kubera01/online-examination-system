
	package com.secureonlineexam.service;

	import java.util.List;

import org.springframework.stereotype.Service;
	import com.secureonlineexam.model.Question;
	import com.secureonlineexam.repository.QuestionRepository;

	
	@Service
	public class QuestionService {

	    private final QuestionRepository questionRepository;

	    public QuestionService(QuestionRepository questionRepository) {
	        this.questionRepository = questionRepository;
	    }

	    public Question saveQuestion(Question question) {
	        return questionRepository.save(question);
	    }
	   
		public List<Question> getQuestionsByExamId(Long examId) {
			return 
					questionRepository.findByExamId(examId);
		}
	
		public void deleteById(Long id){
		    questionRepository.deleteById(id);
		}
		
			}
	

