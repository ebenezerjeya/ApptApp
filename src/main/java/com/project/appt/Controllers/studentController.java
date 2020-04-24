package com.project.appt.Controllers;

import org.springframework.security.crypto.bcrypt.BCrypt;
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

    private response_auth registerAuth = new response_auth(false, false, "register");

    // 1 = initial, 2 = userNotFound
    private int errorType = 1;

    @GetMapping("/student") //retrieve all student objects
    public @ResponseBody Iterable<student_info> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/student/{id}") //retrieve student object based on student id
    public @ResponseBody
    Optional<student_info> getStudent(@PathVariable String id) {
        return studentRepository.findById(id);
    }

    @GetMapping("/student/loginAuth") //return all students' responseAuth object
    public @ResponseBody Iterable<response_auth> getLoginAuth() {
        return responseAuthRepository.findAll();
    }

    @GetMapping("/student/{id}/loginAuth")  //retrieve student's response auth object upon user login session
    public @ResponseBody
    List<response_auth> getStudentLoginAuth(@PathVariable String id) {
        List<response_auth> response = responseAuthService.findAuthById(id); //find the response auth object based on student id

        //set the default value for the attributes in registerAuth object
        registerAuth.setAuth(false);
        registerAuth.setError(false);

        if (response.size() == 0) { //if the student has no responseAuth object
            if (errorType == 1)
                response.add(new response_auth(false, false, "notFound"));
            else {
                response.add(new response_auth(false, true, "notFound"));
                errorType = 1;
            }
        }

        return response;
    }


    @GetMapping("/student/registerAuth") //return the registerAuth object
    public @ResponseBody response_auth getRegisterAuth() {
        return registerAuth;
    }

    @PostMapping("/student/registerAuth") //create student object upon user registration
    public @ResponseBody void createStudent(@RequestBody student_info student) {

        List<student_info> student1 = studentService.findDuplicateStudentID(student.getStudent_id()); //check if the new registered account has already existed
        if(student1.isEmpty()) { //if the student account is not a duplicate
            //set the default values for attributes of the registerAuth object
            registerAuth.setAuth(true);
            registerAuth.setError(false);

            //hash the password and stored it in the database
            student.setStudent_password(BCrypt.hashpw(student.getStudent_password(), BCrypt.gensalt(12)));

            //save the student object in the database
            studentRepository.save(student);

            //create a new responseAuth object for the newly registered student
            responseAuthRepository.save(new response_auth(false, false, student.getStudent_id()));
        }

        if(!student1.isEmpty() && !registerAuth.getError()){ //if the student account is a duplicate
            registerAuth.setError(true); //mark as an registration error
        }
    }


    @PostMapping("/student/{id}/loginAuth") //check student credentials upon user login
    public @ResponseBody void loginCredentials(@RequestBody Credentials credentials, @PathVariable String id) {
        List<response_auth> response = responseAuthService.findAuthById(id); //find the responseAuth object based on student id

        // only do stuff if id is present in database
        if (response.size() != 0) {
            if (credentials.getId().equals("logout")) { //if the student logs out
                response.get(0).setAuth(false);
                responseAuthRepository.save(response.get(0));
            }
            else {
                boolean matched = false;
                List<student_info> student= studentService.findStudentById(credentials.getId()); //find the student object based on student id
                if(!student.isEmpty()) //if the student exists in the database
                    matched = BCrypt.checkpw(credentials.getPassword(), student.get(0).getStudent_password()); //check whether the password from user matches the password stored in the database
                if (student.isEmpty() && !response.get(0).getError() || !matched) { //if the credentials are invalid
                    response.get(0).setError(true);
                    responseAuthRepository.save(response.get(0));
                }

                if (!student.isEmpty() && matched) { //if the credentials are valid
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

    @PutMapping("/student") //update student password
    public @ResponseBody void updateStudent(@RequestBody Credentials credentials) {
        student_info student = studentRepository.findById(credentials.getId()).get();

        //hash the new password and stored it in the database
        student.setStudent_password(BCrypt.hashpw(credentials.getPassword(), BCrypt.gensalt(12)));

        //update the new student password
        studentRepository.save(student);
    }

    @DeleteMapping("/student/{id}") //delete student object based on student id
    public @ResponseBody void deleteStudent(@PathVariable String id) {
        studentRepository.deleteById(id);
    }
}