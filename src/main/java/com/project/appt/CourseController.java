package com.project.appt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/courses")
    public @ResponseBody Iterable<Course_List> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/courses/{id}")
    public @ResponseBody
    Optional<Course_List> getCourses(@PathVariable int id) {
        return courseRepository.findById(id);
    }

    @PostMapping("/courses")
    public @ResponseBody void createCourses(@RequestBody Course_List course) {
        courseRepository.save(course);
    }

    @PutMapping("/courses/{id}")
    public @ResponseBody void updateCourses(@RequestBody Course_List course) {
        courseRepository.save(course);
    }

    @DeleteMapping("/courses/{id}")
    public @ResponseBody void deleteCourses(@PathVariable int id) {
        courseRepository.deleteById(id);
    }
}
