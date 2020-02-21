package com.project.appt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class studentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/student")
    public @ResponseBody Iterable<student_info> getAllStudents() {
        return studentRepository.findAll();
    }
    
    @GetMapping("/student/{id}")
    public @ResponseBody
    Optional<student_info> getStudent(@PathVariable String id) {
        return studentRepository.findById(id);
    }

    @PostMapping("/student")
    public @ResponseBody void createStudent(@RequestBody student_info student) {
        studentRepository.save(student);
    }

    @PutMapping("/student/{id}")
    public @ResponseBody void updateStudent(@RequestBody student_info student) {
        studentRepository.save(student);
    }

    @DeleteMapping("/student/{id}")
    public @ResponseBody void deleteStudent(@PathVariable String id) {
        studentRepository.deleteById(id);
    }

    @PostMapping("/student/auth")
    public @ResponseBody void loginCredentials(@RequestBody Credentials credentials) {
        System.out.println(credentials.getId());
    }

}
