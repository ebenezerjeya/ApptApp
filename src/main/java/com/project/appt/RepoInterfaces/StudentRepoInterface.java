package com.project.appt.RepoInterfaces;

import com.project.appt.Tables.response_auth;
import com.project.appt.Tables.student_info;

import java.util.List;

public interface StudentRepoInterface {
    List<student_info> findStudentById(String id, String password);
    List<student_info> findDuplicateStudentID(String id);
}
