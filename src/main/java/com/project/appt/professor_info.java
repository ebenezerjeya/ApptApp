package com.project.appt;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
class professor_info {
    @Id
    private String professor_id;

    public professor_info() {}

    public professor_info(String id) {
        this.professor_id = id;
    }

    public String getId() {
        return professor_id;
    }

    public void setId(String id) {
        this.professor_id = id;
    }
}
