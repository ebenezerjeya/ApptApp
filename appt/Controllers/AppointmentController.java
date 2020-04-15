package com.project.appt.Controllers;
import com.project.appt.RepoInterfaces.StudentRepoInterface;
import com.project.appt.Repositories.StudentRepository;
import com.project.appt.Tables.Appointment;
import com.project.appt.Repositories.AppointmentRepository;
import com.project.appt.Tables.student_info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private StudentRepoInterface studentService;


    @GetMapping("/appointment")
    public @ResponseBody Iterable<Appointment> getAllAppointment() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/appointment/{id}")
    public @ResponseBody
    List<Appointment> getAppointment(@PathVariable String id) {
        List<student_info> student = studentService.findStudentById(id);
        String email = student.get(0).getStudent_email();
        List<Appointment> appointments = appointmentRepository.findAppointmentByStudentEmail(email);

        return appointments;
    }


    @PostMapping("/appointment")
    public @ResponseBody void createAppointment(@RequestBody Appointment appointment) {
       appointment.setAppointment_date(new java.sql.Date((appointment.getAppointment_date().getTime()+24*60*60*1000)));
       appointmentRepository.save(appointment);
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
