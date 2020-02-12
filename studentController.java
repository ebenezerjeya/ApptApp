package com.project.appt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class studentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/student")
    public @ResponseBody Iterable<student_info> getAllStudents() {
        return studentRepository.findAll();
    }

}
