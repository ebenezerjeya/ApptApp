package com.project.appt;

import org.springframework.context.annotation.Primary;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
class student_info {
    @Id
    private String student_id;
    private String student_fname;
    private String student_lname;
    private String student_email;
    private String student_password;

    public student_info() {}

    public student_info(String id) {
        this.student_id = id;
    }

    public String getId() {
        return student_id;
    }

    public void setId(String id) {
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
