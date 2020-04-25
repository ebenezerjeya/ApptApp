package com.project.appt.Controllers;
import com.project.appt.RepoInterfaces.AvailableTimesRepoInterface;
import com.project.appt.Repositories.AvailableTimesRepository;
import com.project.appt.Repositories.ProfessorRepository;
import com.project.appt.Tables.Professor_Info;
import com.project.appt.Tables.available_times;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Available_timesController {

    @Autowired
    private AvailableTimesRepository availableTimesRepository;

    @Autowired
    private AvailableTimesRepoInterface availableService;

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping("/available_times")
    public @ResponseBody Iterable<available_times> getAllTimes() {
        return availableTimesRepository.findAll();
    }

    @GetMapping("/available_times/{id}")
    public @ResponseBody
    List<available_times> getDate(@PathVariable String id) {
        return availableService.findavailable_timeByProfessorID(id);
    }

    @PostMapping("/available_times")
    public @ResponseBody void createTime(@RequestBody available_times available_ID) {
        // re-adjust the date and set available variable
        available_ID.setDate(new java.sql.Date((available_ID.getDate().getTime()+24*60*60*1000)));
        available_ID.setAvailable(true);

        // find professor to set Location
        Optional<Professor_Info> prof = professorRepository.findById(available_ID.getProfessor_ID());
        prof.ifPresent(professor_info -> {
            if(professor_info.getMic_office() != null)
                available_ID.setLocation(professor_info.getMic_office());
            if(professor_info.getWarr_office() != null)
                available_ID.setLocation(professor_info.getWarr_office());
        });

        // get the day based on the date
        java.util.GregorianCalendar cal = new java.util.GregorianCalendar();
        cal.setTime(available_ID.getDate());
        int day = cal.get(java.util.Calendar.DAY_OF_WEEK);
        switch(day) {
            case 0: available_ID.setDay("Sunday"); break;
            case 1: available_ID.setDay("Monday"); break;
            case 2: available_ID.setDay("Tuesday"); break;
            case 3: available_ID.setDay("Wednesday"); break;
            case 4: available_ID.setDay("Thursday"); break;
            case 5: available_ID.setDay("Friday"); break;
            case 6: available_ID.setDay("Saturday"); break;
        }

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
        return availableService.findavailable_timesByDate(id, convertedDate);
    }
}