package com.project.appt;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
class professor_info {
    @Id
    private String professor_id;
    private String professor_name;
    private String professor_email;
    private String warr_office;
    private String mic_office;

    public professor_info() {}

    public professor_info(String professor_id, String professor_name, String professor_email, String warr_office, String mic_office) {
        this.professor_id = professor_id;
        this.professor_name = professor_name;
        this.professor_email = professor_email;
        this.warr_office = warr_office;
        this.mic_office = mic_office;
    }

    public String getProfessor_id() {
        return professor_id;
    }

    public void setProfessor_id(String id) {
        this.professor_id = id;
    }

    public String getProfessor_name() {
        return professor_name;
    }

    public void setProfessor_name(String professor_name) {
        this.professor_name = professor_name;
    }

    public String getProfessor_email() {
        return professor_email;
    }

    public void setProfessor_email(String professor_email) {
        this.professor_email = professor_email;
    }

    public String getWarr_office() {
        return warr_office;
    }

    public void setWarr_office(String warr_office) {
        this.warr_office = warr_office;
    }

    public String getMIC_office() {
        return mic_office;
    }

    public void setMIC_office(String MIC_office) {
        this.mic_office = MIC_office;
    }
}
