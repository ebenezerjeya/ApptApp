package com.project.appt.RepoInterfaces;

import com.project.appt.Tables.Available_times;

import java.util.List;

public interface AvailableTimesRepoInterface {
    List<Available_times> findavailable_timesByProf(String id);
}
