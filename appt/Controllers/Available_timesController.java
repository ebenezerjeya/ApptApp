package com.project.appt.Controllers;
import com.project.appt.RepoInterfaces.AvailableTimesRepoInterface;
import com.project.appt.Repositories.AvailableTimesRepository;
import com.project.appt.Tables.available_times;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Available_timesController {

    @Autowired
    private AvailableTimesRepository availableTimesRepository;

    @Autowired
    private AvailableTimesRepoInterface availableService;

    @GetMapping("/available_times")
    public @ResponseBody Iterable<available_times> getAllTimes() {
        return availableTimesRepository.findAll();
    }

//    @GetMapping("/available_times/{available_ID}")
//    public @ResponseBody
//    Optional<available_times> getTime(@PathVariable Integer available_ID) {
//        return availableTimesRepository.findById(available_ID);
//    }

    @GetMapping("/available_times/{id}")
    public @ResponseBody
    List<available_times> getTime(@PathVariable String id) {
        return availableService.findavailable_timeByProfessorID(id);
    }


    @PostMapping("/available_times")
    public @ResponseBody void createTime(@RequestBody available_times available_ID) {
        //Date tempDate = available_ID.getDate();
        //update day using
        //java.util.GregorianCalendar cal = new java.util.GregorianCalendar();
        //      cal.setTime(tempDate);
        //      // Getting the day of the week
        //      cal.get(java.util.Calendar.DAY_OF_WEEK) if 2 = MON, 1 = SUN, 0 = SAT;

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

    @GetMapping("/available_timesbydate/{id}/{date}")
    public  @ResponseBody Iterable<available_times> getAvailableTimesByDate(@PathVariable String id, @PathVariable String date){

        Date convertedDate = Date.valueOf(date);
        //List<available_times> Available_times = availableService.findavailable_timesByDate(id, convertedDate);
        return availableService.findavailable_timesByDate(id, convertedDate);

    }

    

}