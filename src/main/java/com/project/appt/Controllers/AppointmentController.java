package com.project.appt.Controllers;
import com.project.appt.RepoInterfaces.AvailableTimesRepoInterface;
import com.project.appt.RepoInterfaces.ProfessorRepoInterface;
import com.project.appt.RepoInterfaces.StudentRepoInterface;
import com.project.appt.Repositories.AvailableTimesRepository;
import com.project.appt.Repositories.ProfessorRepository;
import com.project.appt.Repositories.StudentRepository;
import com.project.appt.Tables.Appointment;
import com.project.appt.Repositories.AppointmentRepository;
import com.project.appt.Tables.Professor_Info;
import com.project.appt.Tables.available_times;
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
    private AvailableTimesRepository availableTimesRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private StudentRepoInterface studentService;

    @Autowired
    private AvailableTimesRepoInterface availableTimesRepoInterface;

    @Autowired
    private ProfessorRepoInterface professorRepoInterface;

    @GetMapping("/appointment") //return all appointments
    public @ResponseBody Iterable<Appointment> getAllAppointment() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/appointment/{id}") //return appointment based on student id or professor id
    public @ResponseBody
    List<Appointment> getAppointment(@PathVariable String id) {
        List<student_info> student = studentService.findStudentById(id); //find student by the student id
        final List<Appointment>[] appointments = new List[]{null};


        if(!student.isEmpty()) { //if the id is a student ID
            String email = student.get(0).getStudent_email();
            appointments[0] = appointmentRepository.findAppointmentByStudentEmail(email); //retrieve the appointment by student email

        }else{//if the id is a professor ID
            Optional<Professor_Info> professors = professorRepository.findById(id); //find professor by the professor id
            professors.ifPresent(prof -> { //if it's a valid professor id
                String profEmail = prof.getProfessor_email();
                appointments[0] = appointmentRepository.findAppointmentByProfessorEmail(profEmail); //retrieve the appointment by professor email
            });

        }
        return appointments[0];
    }

    @PostMapping("/appointment") //create appointment
    public @ResponseBody void createAppointment(@RequestBody Appointment appointment) {
        appointment.setAppointment_date(new java.sql.Date((appointment.getAppointment_date().getTime()+24*60*60*1000))); //set the appointment date
        appointmentRepository.save(appointment); //save the appointment object in the database

        // change available times
        List<Professor_Info> prof = professorRepoInterface.findProfByEmail(appointment.getProfessor_Email());
        String prof_id = prof.get(0).getProfessor_id();
        List<available_times> time = availableTimesRepoInterface.findavailable_time(prof_id, appointment.getAppointment_date(), appointment.getStart_time());
        available_times selected = time.get(0);
        selected.setAvailable(false); //set the available times to false for the specific professor
        availableTimesRepository.save(selected);
    }

    @PutMapping("/appointment/{id}")
    public @ResponseBody void updateAppointment(@RequestBody Appointment appointment) {
        appointmentRepository.save(appointment);
    }

    @DeleteMapping("/appointment/{id}") //delete appointment
    public @ResponseBody void deleteAppointment(@PathVariable int id) {
        Optional<Appointment> appt = appointmentRepository.findById(id); //find the appointment by the appointment id

        appt.ifPresent(appointment -> { //if the appointment id is valid

            // change available times
            List<Professor_Info> prof = professorRepoInterface.findProfByEmail(appointment.getProfessor_Email());
            String prof_id = prof.get(0).getProfessor_id();
            List<available_times> time = availableTimesRepoInterface.findavailable_time(prof_id, appointment.getAppointment_date(), appointment.getStart_time());
            available_times selected = time.get(0);
            selected.setAvailable(true); //set the available times to true for the specific professor
            appointmentRepository.deleteById(id); //delete the appointment
        });
    }
}