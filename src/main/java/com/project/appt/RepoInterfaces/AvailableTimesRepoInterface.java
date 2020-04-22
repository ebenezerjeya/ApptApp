package com.project.appt.RepoInterfaces;

import com.project.appt.Tables.available_times;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

public interface AvailableTimesRepoInterface {
    List<available_times> findavailable_timesByDate(String id, Date date);
    List<available_times> findavailable_time(String id, Date date, Time start_time);
    List<available_times> findavailable_timeByProfessorID(String id);
}
