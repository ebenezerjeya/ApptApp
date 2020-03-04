package com.project.appt.RepoInterfaces;

import com.project.appt.Tables.response_auth;

import java.util.List;

public interface ResponseAuthRepoInterface {
    List<response_auth> findAuthById(String id);
}
