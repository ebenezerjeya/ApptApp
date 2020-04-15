package com.project.appt.Controllers;
import com.project.appt.Services.EmailServiceImpl;
import com.project.appt.Tables.Appointment;
import com.project.appt.Repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping("/appointment")
    public @ResponseBody Iterable<Appointment> getAllAppointment() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/appointment/{id}")
    public @ResponseBody
    Optional<Appointment> getAppointment(@PathVariable int id) {
        return appointmentRepository.findById(id);
    }

    @PostMapping("/appointment")
    public @ResponseBody void createAppointment(@RequestBody Appointment appointment) {
        appointment.setAppointment_date(new java.sql.Date((appointment.getAppointment_date().getTime()+24*60*60*1000)));
        appointmentRepository.save(appointment);
        appointmentRepository.findById(appointment.getAppointment_id());

        EmailServiceImpl e = new EmailServiceImpl();
        e.sendSimpleMessage(appointment.getProfessor_Email(), appointment.getStudent_Email(),
                "[StudentAppointment]" + appointment.getPurpose(), "This is a test");

    }

    @PutMapping("/appointment/{id}")
    public @ResponseBody void updateAppointment(@RequestBody Appointment appointment) {
        appointmentRepository.save(appointment);
    }

    @DeleteMapping("/appointment/{id}")
    public @ResponseBody void deleteAppointment(@PathVariable int id) {
        appointmentRepository.deleteById(id);
    }
}