package com.project.appt.Tables;

import javax.persistence.*;

@Entity
public class student_info {
    @Id
    private String student_id;
    private String student_fname;
    private String student_lname;
    private String student_email;
    private String student_password;

    public student_info() {}

    public student_info(String student_id, String student_fname, String student_lname, String student_email, String student_password) {
        this.student_id = student_id;
        this.student_fname = student_fname;
        this.student_lname = student_lname;
        this.student_email = student_email;
        this.student_password = student_password;
    }

    public student_info(String id) {
        this.student_id = id;
    }

    public String getStudent_id() {
        return student_id;
    }

    public void setStudent_id(String id) {
        this.student_id = id;
    }

    public String getStudent_fname() { return student_fname; }

    public void setStudent_fname(String student_fname) { this.student_fname = student_fname; }

    public String getStudent_lname() { return student_lname; }

    public void setStudent_lname(String student_lname) { this.student_lname = student_lname; }

    public String getStudent_email() { return student_email; }

    public void setStudent_email(String student_email) { this.student_email = student_email; }

    public String getStudent_password() { return student_password; }

    public void setStudent_password(String student_password) { this.student_password = student_password; }
}
