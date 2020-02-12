package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping("/appointment")
    public @ResponseBody Iterable<Appointment> getAllAppointment() {
        return appointmentRepository.findAll();
    }

}