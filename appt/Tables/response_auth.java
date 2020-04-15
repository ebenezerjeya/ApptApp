package com.project.appt.Tables;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class response_auth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int auth_id;
    private Boolean auth;
    private Boolean error;
    private String student_id;

    public response_auth() {
    }

    public response_auth(Boolean auth, Boolean error, String student_id) {
        this.auth = auth;
        this.error = error;
        this.student_id = student_id;
    }

    public int getAuth_id() {
        return auth_id;
    }

    public void setAuth_id(int auth_id) {
        this.auth_id = auth_id;
    }

    public Boolean getAuth() {
        return auth;
    }

    public void setAuth(Boolean auth) {
        this.auth = auth;
    }

    public Boolean getError() {
        return error;
    }

    public void setError(Boolean error) {
        this.error = error;
    }

    public String getStudent_id() {
        return student_id;
    }

    public void setStudent_id(String student_id) {
        this.student_id = student_id;
    }
}
