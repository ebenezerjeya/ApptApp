package com.project.appt.Repositories;

import com.project.appt.Tables.Appointment;
import org.springframework.data.repository.CrudRepository;

public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {

}
