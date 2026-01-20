package com.padel.reservation.controller;

import com.padel.reservation.dto.AuthenticationRequest;
import com.padel.reservation.dto.AuthenticationResponse;
import com.padel.reservation.dto.RegisterRequest;
import com.padel.reservation.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService service;

    public AuthenticationController(AuthenticationService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @org.springframework.web.bind.annotation.GetMapping("/debug/users")
    public ResponseEntity<java.util.List<com.padel.reservation.entity.User>> getAllUsersDebug() {
        return ResponseEntity.ok(service.getAllUsers());
    }
}
