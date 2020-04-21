package com.project.appt.Services;

import com.project.appt.RepoInterfaces.ProfessorRepoInterface;
import com.project.appt.Repositories.ProfessorRepository;
import com.project.appt.Tables.Professor_Info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService implements ProfessorRepoInterface {

    @Autowired
    private ProfessorRepository professorRepository;

    @Override
    public List<Professor_Info> findProfByEmail(String email) {
        return professorRepository.findProfByEmail(email);
    }
}
