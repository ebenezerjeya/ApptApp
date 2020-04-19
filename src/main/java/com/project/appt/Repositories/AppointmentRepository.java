package com.project.appt.Repositories;

import com.project.appt.Tables.Appointment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {

    @Query("select a from Appointment a where Student_Email = ?1")
    List<Appointment> findAppointmentByStudentEmail(String email);
}