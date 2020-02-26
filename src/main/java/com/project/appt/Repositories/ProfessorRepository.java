package com.project.appt.Repositories;

import com.project.appt.Tables.Professor_Info;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends CrudRepository<Professor_Info, String>{

}
