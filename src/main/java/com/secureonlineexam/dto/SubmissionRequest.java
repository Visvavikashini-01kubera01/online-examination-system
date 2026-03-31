package com.secureonlineexam.dto;

import java.util.List;

public class SubmissionRequest {
	//added
private String name;
    private String rollNumber;
    private int examId;
    private List<AnswerDTO> answers;

    public static class AnswerDTO {
        private Long questionId;
        private String selectedOption;

        // Getters & Setters
        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }
        public String getSelectedOption() { return selectedOption; }
        public void setSelectedOption(String selectedOption) { this.selectedOption = selectedOption; }
    }

    // Getters & Setters
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public int getExamId() { return examId; }
    public void setExamId(int examId) { this.examId = examId; }
    public List<AnswerDTO> getAnswers() { return answers; }
    public void setAnswers(List<AnswerDTO> answers) { this.answers = answers; }
    public String getName() {
    	return name;
    }
    public void setName(String name) {
    	this.name=name;
    }
    }
