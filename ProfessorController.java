package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping("/professors")
    public @ResponseBody Iterable<Professor_Info> getAllProfessors() {
        return professorRepository.findAll();
    }

    @GetMapping("/professors/{id}")
    public @ResponseBody
    Optional<Professor_Info> getProfessor(@PathVariable String id) {
        return professorRepository.findById(id);
    }

    @PostMapping("/professors")
    public @ResponseBody void createProfessor(@RequestBody Professor_Info professor) {
        professorRepository.save(professor);
    }

    @PutMapping("/professors/{id}")
    public @ResponseBody void updateProfessor(@RequestBody Professor_Info professor) {
        professorRepository.save(professor);
    }

    @DeleteMapping("/professors/{id}")
    public @ResponseBody void deleteProfessor(@PathVariable String id) {
        professorRepository.deleteById(id);
    }
}
