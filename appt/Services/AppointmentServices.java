package com.project.appt.Services;

import com.project.appt.RepoInterfaces.AppointmentRepoInterface;
import com.project.appt.Repositories.AppointmentRepository;
import com.project.appt.Tables.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServices implements AppointmentRepoInterface {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public List<Appointment> findAppointmentByStudentEmail(String email) {
        return appointmentRepository.findAppointmentByStudentEmail(email);
    }

    @Override
    public List<Appointment> findAppointmentByProfessorEmail(String email) {
        return appointmentRepository.findAppointmentByProfessorEmail(email);
    }
}