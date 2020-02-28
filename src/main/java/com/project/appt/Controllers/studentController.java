package com.project.appt.Controllers;

import com.project.appt.Authentication.Credentials;
import com.project.appt.Authentication.ResponseAuth;
import com.project.appt.RepoInterfaces.StudentRepoInterface;
import com.project.appt.Repositories.StudentRepository;
import com.project.appt.Tables.student_info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class studentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentRepoInterface studentService;

    private ResponseAuth loginAuth = new ResponseAuth(false, false);
    private ResponseAuth registerAuth = new ResponseAuth(false, false);

    @GetMapping("/student")
    public @ResponseBody Iterable<student_info> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/student/{id}")
    public @ResponseBody
    Optional<student_info> getStudent(@PathVariable String id) {
        return studentRepository.findById(id);
    }

    @GetMapping("/student/loginAuth")
    public @ResponseBody ResponseAuth getLoginAuth() {
        return loginAuth;
    }

    @GetMapping("/student/registerAuth")
    public @ResponseBody ResponseAuth getRegisterAuth() {
        return registerAuth;
    }

    @PostMapping("/student/registerAuth")
    public @ResponseBody void createStudent(@RequestBody student_info student) {
        //check student.getId
        List<student_info> student1 = studentService.findDuplicateStudentID(student.getStudent_id());
        if(student1.isEmpty()) {
            registerAuth.setAuth(true);
            registerAuth.setError(false);
            studentRepository.save(student);
        }

        if(!student1.isEmpty() && !registerAuth.getError()){
            registerAuth.setError(true);
        }
    }

    @PostMapping("/student/loginAuth")
    public @ResponseBody void loginCredentials(@RequestBody Credentials credentials) {
        if (credentials.getId().equals("logout")) {
            loginAuth.setAuth(false);
        }
        else {
            List<student_info> student= studentService.findStudentById(credentials.getId(), credentials.getPassword());

            if (student.isEmpty() && !loginAuth.getError())
                loginAuth.setError(true);

            if (!student.isEmpty()) {
                loginAuth.setAuth(!student.isEmpty());
                loginAuth.setError(false);
            }
        }
    }

    @PutMapping("/student/{id}")
    public @ResponseBody void updateStudent(@RequestBody student_info student) {
        studentRepository.save(student);
    }

    @DeleteMapping("/student/{id}")
    public @ResponseBody void deleteStudent(@PathVariable String id) {
        studentRepository.deleteById(id);
    }
}