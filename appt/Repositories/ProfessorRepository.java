package com.project.appt.Repositories;

import com.project.appt.Tables.Professor_Info;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessorRepository extends CrudRepository<Professor_Info, String>{
    @Query("select s from Professor_Info s where professor_email = ?1")
    List<Professor_Info> findProfByEmail(String email);
}
