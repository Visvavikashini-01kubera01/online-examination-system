package com.secureonlineexam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.secureonlineexam.model.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {
//	Exam findTopByOrderByIdDesc();
}