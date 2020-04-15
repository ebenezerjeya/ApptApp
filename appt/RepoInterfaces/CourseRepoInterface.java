package com.project.appt.RepoInterfaces;

import com.project.appt.Tables.Course_List;

public interface CourseRepoInterface {
    Iterable<Course_List> findCourseByProfessor(String id);
}
