package com.project.appt.Services;

import com.project.appt.RepoInterfaces.ResponseAuthRepoInterface;
import com.project.appt.Repositories.ResponseAuthRepository;
import com.project.appt.Tables.response_auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponseAuthService implements ResponseAuthRepoInterface {

    @Autowired
    private ResponseAuthRepository responseAuthRepository;

    @Override
    public List<response_auth> findAuthById(String id) {
        return responseAuthRepository.findAuthById(id);
    }
}
