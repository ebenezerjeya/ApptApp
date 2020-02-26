package com.project.appt.Repositories;

import com.project.appt.Tables.student_info;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends CrudRepository<student_info, String>{

    @Query("select s from student_info s where student_id = ?1 and student_password = ?2")
    List<student_info> findStudentById(String id, String password);

    @Query("select s1 from student_info s1 where student_id =?1")
    List<student_info> findDuplicateStudentID(String id);
}
