package com.project.appt.RepoInterfaces;

import com.project.appt.Tables.Available_times;

import java.sql.Date;
import java.util.List;

public interface AvailableTimesRepoInterface {
    List<Available_times> findavailable_timesByDate(String id, Date date);
}
