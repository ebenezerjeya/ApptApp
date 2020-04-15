package com.project.appt.RepoInterfaces;


import com.project.appt.Tables.Appointment;

import java.util.List;

public interface AppointmentRepoInterface {
    List<Appointment> findAppointmentByStudentEmail(String email);
}
