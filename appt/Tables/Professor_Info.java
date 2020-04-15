package com.project.appt.Tables;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Professor_Info {
    @Id
    private String professor_id;
    private String professor_name;
    private String professor_email;
    private String warr_office;
    private String mic_office;

    public Professor_Info() {}

    public Professor_Info(String id, String name, String email, String warr, String mic) {
        this.professor_id = id;
        this.professor_name = name;
        this.professor_email = email;
        this.warr_office = warr;
        this.mic_office = mic;

    }

    public String getProfessor_id() {
        return professor_id;
    }

    public String getProfessor_name(){
        return professor_name;
    }

    public String getProfessor_email() {
        return professor_email;
    }

    public String getWarr_office() {
        return warr_office;
    }

    public String getMic_office() {
        return mic_office;
    }

    public void setProfessor_id(String id) {
        this.professor_id = id;
    }

    public void setProfessor_name(String professor_name) {
        this.professor_name = professor_name;
    }

    public void setProfessor_email(String professor_email) {
        this.professor_email = professor_email;
    }

    public void setWarr_office(String warr_office) {
        this.warr_office = warr_office;
    }

    public void setMic_office(String mic_office) {
        this.mic_office = mic_office;
    }
}
