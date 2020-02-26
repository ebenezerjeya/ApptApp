package com.project.appt.Services;

import com.project.appt.RepoInterfaces.StudentRepoInterface;
import com.project.appt.Repositories.StudentRepository;
import com.project.appt.Tables.student_info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService implements StudentRepoInterface {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<student_info> findStudentById(String id, String password){
        return studentRepository.findStudentById(id, password);
    }

    @Override
    public List<student_info> findDuplicateStudentID(String id) {
        return studentRepository.findDuplicateStudentID(id);
    }
}
