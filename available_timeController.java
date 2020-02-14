package com.project.appt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class available_timeController {

    @Autowired
    private AvailableTimesRepository availableTimesRepository;

    @GetMapping("/times")
    public @ResponseBody Iterable<available_time> getAllTimes() {
        return availableTimesRepository.findAll();
    }

    @GetMapping("/available_time/{date}")
    public @ResponseBody
    Optional<available_time> getTime(@PathVariable Date date) {
        return availableTimesRepository.findById(date);
    }

    @PostMapping("/available_time")
    public @ResponseBody void createTime(@RequestBody available_time date) {
        availableTimesRepository.save(date);
    }

    @PutMapping("/available_time/{date}")
    public @ResponseBody void updateTime(@RequestBody available_time date) {
        availableTimesRepository.save(date);
    }

    @DeleteMapping("/available_time/{date}")
    public @ResponseBody void deleteTime(@PathVariable Date date) {
        availableTimesRepository.deleteById(date);
    }


}