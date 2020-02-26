package com.project.appt.Authentication;

public class ResponseAuth {
    private Boolean auth;
    private Boolean error;

    public ResponseAuth(Boolean auth, Boolean error) {
        this.auth = auth;
        this.error = error;
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
}
