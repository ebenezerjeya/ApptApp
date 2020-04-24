package com.project.appt.Controllers;
import com.project.appt.RepoInterfaces.CourseRepoInterface;
import com.project.appt.Repositories.CourseRepository;
import com.project.appt.Tables.Course_List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseRepoInterface courseRepoInterface;

    @GetMapping("/courses") //retrieve all courses
    public @ResponseBody Iterable<Course_List> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/courses/{id}") //retrieve courses based on course id
    public @ResponseBody
    Optional<Course_List> getCourses(@PathVariable int id) {
        return courseRepository.findById(id);
    }

    @GetMapping("/courses_prof/{professor_id}") //retrieve courses based on professor id
    public @ResponseBody Iterable<Course_List> getCoursesByProfessor(@PathVariable String professor_id) {
        return courseRepoInterface.findCourseByProfessor(professor_id);
    }

    @PostMapping("/courses") //create courses
    public @ResponseBody void createCourses(@RequestBody Course_List course) {
        courseRepository.save(course);
    }

    @PutMapping("/courses/{id}") //update courses
    public @ResponseBody void updateCourses(@RequestBody Course_List course) {
        courseRepository.save(course);
    }

    @DeleteMapping("/courses/{id}") //delete courses
    public @ResponseBody void deleteCourses(@PathVariable int id) {
        courseRepository.deleteById(id);
    }


}
