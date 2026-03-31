package com.secureonlineexam.dto;
	
	import java.util.List;

	public class QuestionRequest {


	    private Long examId;
	    private List<QuestionData> questions;

	    public static class QuestionData {
	        private String questionText;
	        private String optiona;
	        private String optionb;
	        private String optionc;
	        private String optiond;
	        private String correctAnswer;

	        // Getters & Setters
	        public String getQuestionText() { return questionText; }
	        public void setQuestionText(String questionText) { this.questionText = questionText; }
	        public String getOptionA() { return optiona; }
	        public void setOptionA(String optiona) { this.optiona = optiona; }
	        public String getOptionB() { return optionb; }
	        public void setOptionB(String optionb) { this.optionb = optionb; }
	        public String getOptionC() { return optionc; }
	        public void setOptionC(String optionc) { this.optionc = optionc; }
	        public String getOptionD() { return optiond; }
	        public void setOptionD(String optiond) { this.optiond = optiond; }
	        public String getCorrectAnswer() { return correctAnswer; }
	        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
	    }

	    // Getters & Setters
	    public Long getExamId() { return examId; }
	    public void setExamId(Long examId) { this.examId = examId; }
	    public List<QuestionData> getQuestions() { return questions; }
	    public void setQuestions(List<QuestionData> questions) { this.questions = questions; }
	}

