package com.project.appt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Available_timesController {

    @Autowired
    private AvailableTimesRepository availableTimesRepository;

    @GetMapping("/available_times")
    public @ResponseBody Iterable<available_times> getAllTimes() {
        return availableTimesRepository.findAll();
    }

    @GetMapping("/available_times/{available_ID}")
    public @ResponseBody
    Optional<available_times> getTime(@PathVariable Integer available_ID) {
        return availableTimesRepository.findById(available_ID);
    }

    @PostMapping("/available_times")
    public @ResponseBody void createTime(@RequestBody available_times available_ID) {
        availableTimesRepository.save(available_ID);
    }

    @PutMapping("/available_times/{available_ID}")
    public @ResponseBody void updateTime(@RequestBody available_times available_ID) {
        availableTimesRepository.save(available_ID);
    }

    @DeleteMapping("/available_times/{available_ID}")
    public @ResponseBody void deleteTime(@PathVariable Integer available_ID) {
        availableTimesRepository.deleteById(available_ID);
    }


}