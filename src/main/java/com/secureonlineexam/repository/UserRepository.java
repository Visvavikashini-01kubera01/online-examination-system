package com.secureonlineexam.repository;

import com.secureonlineexam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Student login
   // User findByNameAndRollNumberAndRole(
           // String name,
            //String rollNumber,
           // String role
    //);

    // Teacher login
    //User findByNameAndRole(
      //      String name,
        //    String role
    //);

    // Change password
    //User findByRollNumber(String rollNumber);
//}
	

	

	    // login student
	    User findByNameAndPasswordAndRollNumberAndRole(
	            String name,
	            String password,
	            String rollNumber,
	            String role
	    );

	    // login teacher
	    User findByNameAndPasswordAndRole(
	            String name,
	            String password,
	            String role
	    );

	    // existing method (do not remove)
	    User findByNameAndRollNumberAndRole(
	            String name,
	            String rollNumber,
	            String role
	    );

	    // new methods for change password
	    User findByRollNumberAndRole(String rollNumber, String role);

	    User findByNameAndRole(String name, String role);
	}