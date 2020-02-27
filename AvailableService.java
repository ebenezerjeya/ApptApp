package com.project.appt.Services;

import com.project.appt.RepoInterfaces.AvailableTimesRepoInterface;
import com.project.appt.Repositories.AvailableTimesRepository;
import com.project.appt.Tables.Available_times;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailableService implements AvailableTimesRepoInterface {

    @Autowired
    private  AvailableTimesRepository availableTimesRepository;

    @Override
    public List<Available_times> findavailable_timesByProf(String id) {return availableTimesRepository.findavailable_timesByProf(id);}
}
