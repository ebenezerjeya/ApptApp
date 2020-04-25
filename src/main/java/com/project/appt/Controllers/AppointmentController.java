package com.project.appt.Controllers;
import com.project.appt.RepoInterfaces.AvailableTimesRepoInterface;
import com.project.appt.RepoInterfaces.ProfessorRepoInterface;
import com.project.appt.RepoInterfaces.StudentRepoInterface;
import com.project.appt.Repositories.AvailableTimesRepository;
import com.project.appt.Repositories.ProfessorRepository;
import com.project.appt.Services.EmailServiceImpl;
import com.project.appt.Tables.Appointment;
import com.project.appt.Repositories.AppointmentRepository;
import com.project.appt.Tables.Professor_Info;
import com.project.appt.Tables.available_times;
import com.project.appt.Tables.student_info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
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

    @GetMapping("/appointment")
    public @ResponseBody Iterable<Appointment> getAllAppointment() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/appointment/{id}")
    public @ResponseBody
    List<Appointment> getAppointment(@PathVariable String id) {
        List<student_info> student = studentService.findStudentById(id);
        final List<Appointment>[] appointments = new List[]{null};

        if(!student.isEmpty()) { //if the id is a student ID
            String email = student.get(0).getStudent_email();
            appointments[0] = appointmentRepository.findAppointmentByStudentEmail(email);
        }
        else{//if the id is a professor ID
            Optional<Professor_Info> professors = professorRepository.findById(id);
            professors.ifPresent(prof -> {
                String profEmail = prof.getProfessor_email();
                appointments[0] = appointmentRepository.findAppointmentByProfessorEmail(profEmail);
            });
        }
        return appointments[0];
    }

    @PostMapping("/appointment")
    public @ResponseBody void createAppointment(@RequestBody Appointment appointment) throws MessagingException {
        appointment.setAppointment_date(new java.sql.Date((appointment.getAppointment_date().getTime()+24*60*60*1000)));
        appointmentRepository.save(appointment);
        appointmentRepository.findById(appointment.getAppointment_id());

        // change available times
        List<Professor_Info> prof = professorRepoInterface.findProfByEmail(appointment.getProfessor_Email());
        String prof_id = prof.get(0).getProfessor_id();

        List<available_times> time = availableTimesRepoInterface.findavailable_time(prof_id, appointment.getAppointment_date(), appointment.getStart_time());
        available_times selected = time.get(0);
        selected.setAvailable(false);
        availableTimesRepository.save(selected);

        EmailServiceImpl e = new EmailServiceImpl();
        e.sendSimpleMessage(appointment.getProfessor_Email(), appointment.getStudent_Email(),
                "[StudentAppointment] " + appointment.getPurpose(), "<h1>New appointment scheduled on " +
                        appointment.getAppointment_date() + "</h1> <h2>Appointment Time: " + appointment.getStart_time() + "</h2>" +
                        "<h2> Location: " + appointment.getOffice() + "</h2> <br> <p><i>Additional details: " +
                        appointment.getAppointment_description() + "</i></p>" + " <br><h4>Appointment set by: " +
                        appointment.getStudent_Email() + "</h4>");

    }

    @DeleteMapping("/appointment/{id}")
    public @ResponseBody void deleteAppointment(@PathVariable int id) {
        Optional<Appointment> appt = appointmentRepository.findById(id);

        appt.ifPresent(appointment -> {

            // change available times
            List<Professor_Info> prof = professorRepoInterface.findProfByEmail(appointment.getProfessor_Email());
            String prof_id = prof.get(0).getProfessor_id();

            List<available_times> time = availableTimesRepoInterface.findavailable_time(prof_id, appointment.getAppointment_date(), appointment.getStart_time());
            available_times selected = time.get(0);
            selected.setAvailable(true);
            appointmentRepository.deleteById(id);

            EmailServiceImpl e = new EmailServiceImpl();
            try {
                e.sendSimpleMessage(appointment.getProfessor_Email(), appointment.getStudent_Email(),
                        "[StudentAppointment Cancellation]", "<h1>Appointment cancelled on " +
                                appointment.getAppointment_date() + "</h1> <h2>Time slot freed up: " + appointment.getStart_time() + "</h2>" +
                                "<h2> Location: " + appointment.getOffice() + "</h2> <br> " + " <br><h4>Appointment cancelled by: " +
                                appointment.getStudent_Email() + "</h4>");
            } catch (MessagingException messagingException) {
                messagingException.printStackTrace();
            }
        });
    }
}