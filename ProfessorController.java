package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping("/professor_info")
    public @ResponseBody Iterable<Professor_Info> getAllProfessors() {
        return professorRepository.findAll();
    }
    
}