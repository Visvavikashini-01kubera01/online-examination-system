
	package com.secureonlineexam.repository;

	import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.secureonlineexam.model.Question;
import java.util.List;
@Repository
	public interface QuestionRepository extends JpaRepository<Question, Long> {
		List<Question >findByExamId(Long examId);
	}
	

