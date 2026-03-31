
	package com.secureonlineexam.repository;

	import org.springframework.data.jpa.repository.JpaRepository;
	import com.secureonlineexam.model.Student;

	public interface StudentRepository extends JpaRepository<Student, Long> {
	}

