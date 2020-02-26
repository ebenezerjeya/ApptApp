package com.project.appt.Repositories;

import com.project.appt.Tables.Course_List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course_List, Integer> {
    @Query("select c from Course_List c where professor_id = ?1")
    Iterable<Course_List> findCourseByProfessor(String id);
}
