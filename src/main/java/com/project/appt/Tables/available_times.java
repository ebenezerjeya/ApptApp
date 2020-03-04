package com.project.appt.Tables;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.Date;

@Entity
public class available_times {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer available_ID;
    private String location;
    private String day;
    private Date start_time;
    private Date end_time;
    private Date date;
    private Boolean available;
    private String professor_ID;

    public available_times(){
    }

    public available_times(Integer available_ID, String location, String day, Date start_time, Date end_time, Date date, Boolean available, String professor_ID) {
        this.available_ID = available_ID;
        this.available = available;
        this.date = date;
        this.end_time = end_time;
        this.start_time = start_time;
        this.location = location;
        this.day = day;
        this.professor_ID = professor_ID;
    }
    public  Integer getAvailable_ID(){
        return available_ID;
    }
    public void setAvailable_ID(Integer available_ID){
        this.available_ID = available_ID;
    }
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public Date getStart_time() {
        return start_time;
    }

    public void setStart_time(Date start_time) {
        this.start_time = start_time;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getProfessor_ID() {
        return professor_ID;
    }

    public void setProfessor_ID(String professor_ID) {
        this.professor_ID = professor_ID;
    }

}
