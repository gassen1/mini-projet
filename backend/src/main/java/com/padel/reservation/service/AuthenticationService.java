package com.padel.reservation.service;

import com.padel.reservation.dto.AuthenticationRequest;
import com.padel.reservation.dto.AuthenticationResponse;
import com.padel.reservation.dto.RegisterRequest;
import com.padel.reservation.entity.Role;
import com.padel.reservation.entity.User;
import com.padel.reservation.repository.UserRepository;
import com.padel.reservation.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, EmailService emailService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        String finalPassword = (request.getPassword() != null && !request.getPassword().isEmpty()) 
                ? request.getPassword() 
                : UUID.randomUUID().toString().substring(0, 8);
        
        var user = User.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .password(passwordEncoder.encode(finalPassword))
                .telephone(request.getTelephone())
                .role(Role.ADHERENT)
                .build();
        repository.save(user);
        
        System.out.println("User registered: " + request.getEmail());
        
        try {
            emailService.sendEmail(
                user.getEmail(),
                "Welcome to PadelPRO!",
                "Hello " + user.getNom() + ",\n\nYour account has been successfully created. You can now log in to reserve your favorite courts.\n\nBest regards,\nThe PadelPRO Team"
            );
        } catch (Exception e) {
            System.err.println("Failed to send welcome email: " + e.getMessage());
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public java.util.List<User> getAllUsers() {
        return repository.findAll();
    }
}
