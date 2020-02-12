package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Time;
import java.sql.Date;

@Entity
public class Appointment {

    @Id
    @GeneratedValue
    private int appointment_id;
    private String Professor_Email;
    private String Student_Email;
    private String course_code;
    private String purpose;
    private String office;
    private Time start_time;
    private Time end_time;
    private String appointment_description;
    private String student_fname;
    private String student_lname;
    private short sent;
    private Date appointment_date;

    public int getAppointment_id() {
        return appointment_id;
    }

    public void setAppointment_id(int appointment_id) {
        this.appointment_id = appointment_id;
    }

    public String getProfessor_Email() {
        return Professor_Email;
    }

    public void setProfessor_Email(String professor_Email) {
        Professor_Email = professor_Email;
    }

    public String getStudent_Email() {
        return Student_Email;
    }

    public void setStudent_Email(String student_Email) {
        Student_Email = student_Email;
    }

    public String getCourse_code() {
        return course_code;
    }

    public void setCourse_code(String course_code) {
        this.course_code = course_code;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
    }

    public Time getStart_time() {
        return start_time;
    }

    public void setStart_time(Time start_time) {
        this.start_time = start_time;
    }

    public Time getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Time end_time) {
        this.end_time = end_time;
    }

    public String getAppointment_description() {
        return appointment_description;
    }

    public void setAppointment_description(String appointment_description) {
        this.appointment_description = appointment_description;
    }

    public Date getAppointment_date() {
        return appointment_date;
    }

    public void setAppointment_date(Date appointment_date) {
        this.appointment_date = appointment_date;
    }

    public String getStudent_fname() {
        return student_fname;
    }

    public void setStudent_fname(String student_fname) {
        this.student_fname = student_fname;
    }

    public String getStudent_lname() {
        return student_lname;
    }

    public void setStudent_lname(String student_lname) {
        this.student_lname = student_lname;
    }

    public short getSent() {
        return sent;
    }

    public void setSent(short sent) {
        this.sent = sent;
    }
}
