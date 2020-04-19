package com.project.appt.RepoInterfaces;

import com.project.appt.Tables.Professor_Info;

import java.util.List;

public interface ProfessorRepoInterface {
    List<Professor_Info> findProfByEmail(String email);
}
