package com.project.appt.Repositories;

import com.project.appt.Tables.available_times;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface AvailableTimesRepository extends CrudRepository<available_times, Integer> {
    @Query("select a from available_times a where professor_id = ?1 and date = ?2 and available = 1")
    List<available_times> findavailable_timesByDate(String id, Date date);

}
