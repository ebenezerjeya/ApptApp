package com.project.appt.RepoInterfaces;

import com.project.appt.Tables.available_times;

import java.sql.Date;
import java.util.List;

public interface AvailableTimesRepoInterface {
    List<available_times> findavailable_timesByDate(String id, Date date);
}
