package com.REACT_API.API_backend.controller;

import com.REACT_API.API_backend.auth.AuthenticationRequest;
import com.REACT_API.API_backend.auth.AuthenticationRespone;
import com.REACT_API.API_backend.auth.RegisterRequest;
import com.REACT_API.API_backend.entity.User;
import com.REACT_API.API_backend.service.AuthenticationService;
import com.REACT_API.API_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationRespone> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationRespone> register(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));

    }
}
