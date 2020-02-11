package com.project.appt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping("/professors")
    public @ResponseBody Iterable<professor_info> getAllProfessors() {
        return professorRepository.findAll();
    }

    @PostMapping("/professors")
    public @ResponseBody void createProfessor(@RequestBody professor_info prof) {
        professorRepository.save(prof);
    }
}
