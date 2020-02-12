package com.project.appt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class available_timeController {

    @Autowired
    private AvailableTimesRepository availableTimesRepository;

    @GetMapping("/times")
    public @ResponseBody Iterable<available_time> getAllTimes() {
        return availableTimesRepository.findAll();
    }

}