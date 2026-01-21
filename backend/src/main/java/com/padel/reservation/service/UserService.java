package com.padel.reservation.service;

import com.padel.reservation.entity.User;
import com.padel.reservation.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(String email, User updatedUserInfo) {
        User user = getProfile(email);
        user.setNom(updatedUserInfo.getNom());
        user.setPrenom(updatedUserInfo.getPrenom());
        user.setTelephone(updatedUserInfo.getTelephone());
        
        if (updatedUserInfo.getPassword() != null && !updatedUserInfo.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUserInfo.getPassword()));
        }
        
        return userRepository.save(user);
    }
}
