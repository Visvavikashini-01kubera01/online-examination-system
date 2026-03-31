package com.secureonlineexam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.secureonlineexam.model.Result;
import java.util.List;


//@Repository
//public interface ResultRepository extends JpaRepository<Result, Long> {

    //List<Result> findByExamId(int examId);

    //Optional<Result> findByRollNumberAndExamId(String rollNumber, int examId);
    //void deleteByRollNumberAndExamId(String rollNumber, int examId);
//}
@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

    List<Result> findByExamId(int examId);

    List<Result> findByRollNumberAndExamId(String rollNumber, int examId);

    void deleteByRollNumberAndExamId(String rollNumber, int examId);
}