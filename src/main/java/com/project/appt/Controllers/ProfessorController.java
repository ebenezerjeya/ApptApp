package com.project.appt.Controllers;

import com.project.appt.Repositories.ProfessorRepository;
import com.project.appt.Tables.Professor_Info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping("/professors") //retrieve all professors object
    public @ResponseBody Iterable<Professor_Info> getAllProfessors() {
        return professorRepository.findAll();
    }

    @GetMapping("/professors/{id}") //retrieve professor object based on professor id
    public @ResponseBody
    Optional<Professor_Info> getProfessor(@PathVariable String id) {
        return professorRepository.findById(id);
    }

    @PostMapping("/professors") //create a new professor object
    public @ResponseBody void createProfessor(@RequestBody Professor_Info professor) {
        professorRepository.save(professor);
    }

    @PutMapping("/professors/{id}") //update an existing professor object based on the professor id
    public @ResponseBody void updateProfessor(@RequestBody Professor_Info professor) {
        professorRepository.save(professor);
    }

    @DeleteMapping("/professors/{id}") //delete professor object based on professor id
    public @ResponseBody void deleteProfessor(@PathVariable String id) {
        professorRepository.deleteById(id);
    }


}