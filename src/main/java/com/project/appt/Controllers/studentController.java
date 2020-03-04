package com.project.appt.Controllers;

import com.project.appt.Authentication.Credentials;
import com.project.appt.RepoInterfaces.ResponseAuthRepoInterface;
import com.project.appt.RepoInterfaces.StudentRepoInterface;
import com.project.appt.Repositories.ResponseAuthRepository;
import com.project.appt.Repositories.StudentRepository;
import com.project.appt.Tables.response_auth;
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

    @Autowired
    private ResponseAuthRepository responseAuthRepository;

    @Autowired
    private ResponseAuthRepoInterface responseAuthService;

    // I did this cause idk what else to do lol
    // 1 = initial, 2 = userNotFound
    private int errorType = 1;

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
    public @ResponseBody Iterable<response_auth> getLoginAuth() {
        return responseAuthRepository.findAll();
    }

    @GetMapping("/student/{id}/loginAuth")
    public @ResponseBody
    List<response_auth> getStudentLoginAuth(@PathVariable String id) {
        List<response_auth> response = responseAuthService.findAuthById(id);

        if (response.size() == 0) {
            if (errorType == 1)
                response.add(new response_auth(false, false, "notFound"));
            else {
                response.add(new response_auth(false, true, "notFound"));
                errorType = 1;
            }
        }

        return response;
    }

    /*
    @GetMapping("/student/registerAuth")
    public @ResponseBody response_auth getRegisterAuth() {
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
    */

    @PostMapping("/student/{id}/loginAuth")
    public @ResponseBody void loginCredentials(@RequestBody Credentials credentials, @PathVariable String id) {
        List<response_auth> response = responseAuthService.findAuthById(id);

        // only do stuff if id is present in database
        if (response.size() != 0) {
            if (credentials.getId().equals("logout")) {
                response.get(0).setAuth(false);
                responseAuthRepository.save(response.get(0));
            }
            else {
                List<student_info> student= studentService.findStudentById(credentials.getId(), credentials.getPassword());
                if (student.isEmpty() && !response.get(0).getError()) {
                    response.get(0).setError(true);
                    responseAuthRepository.save(response.get(0));
                }

                if (!student.isEmpty()) {
                    response.get(0).setAuth(true);
                    response.get(0).setError(false);
                    responseAuthRepository.save(response.get(0));
                }
            }
        }
        else {
            errorType = 2;
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