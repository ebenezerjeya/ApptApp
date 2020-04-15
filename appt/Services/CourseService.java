package com.project.appt.Services;

import com.project.appt.RepoInterfaces.CourseRepoInterface;
import com.project.appt.Repositories.CourseRepository;
import com.project.appt.Tables.Course_List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CourseService implements CourseRepoInterface {
    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Iterable<Course_List> findCourseByProfessor(String id) {
        return courseRepository.findCourseByProfessor(id);
    }
}
