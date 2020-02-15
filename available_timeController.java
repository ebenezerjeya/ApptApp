package com.project.appt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class available_timeController {

    @Autowired
    private AvailableTimesRepository availableTimesRepository;

    @GetMapping("/available_times")
    public @ResponseBody Iterable<available_time> getAllTimes() {
        return availableTimesRepository.findAll();
    }

    @GetMapping("/available_times/{available_ID}")
    public @ResponseBody
    Optional<available_time> getTime(@PathVariable Integer available_ID) {
        return availableTimesRepository.findById(available_ID);
    }

    @PostMapping("/available_times")
    public @ResponseBody void createTime(@RequestBody available_time available_ID) {
        availableTimesRepository.save(available_ID);
    }

    @PutMapping("/available_times/{available_ID}")
    public @ResponseBody void updateTime(@RequestBody available_time available_ID) {
        availableTimesRepository.save(available_ID);
    }

    @DeleteMapping("/available_times/{available_ID}")
    public @ResponseBody void deleteTime(@PathVariable Integer available_ID) {
        availableTimesRepository.deleteById(available_ID);
    }


}