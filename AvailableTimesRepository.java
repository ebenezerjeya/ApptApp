package com.project.appt;

import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface AvailableTimesRepository extends CrudRepository<available_time, Date> {

}

