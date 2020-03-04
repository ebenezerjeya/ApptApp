package com.project.appt.Repositories;

import com.project.appt.Tables.response_auth;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponseAuthRepository extends CrudRepository<response_auth, Integer> {
    @Query("select r from response_auth r where student_id =?1")
    List<response_auth> findAuthById(String id);
}