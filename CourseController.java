package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/courses")
    public @ResponseBody Iterable<Course_List> getAllCourses() {
        return courseRepository.findAll();
    }

}
