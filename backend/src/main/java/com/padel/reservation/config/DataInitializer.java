package com.padel.reservation.config;

import com.padel.reservation.entity.Role;
import com.padel.reservation.entity.User;
import com.padel.reservation.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner commandLineRunner(UserRepository repository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (repository.findByEmail("admin@padel.com").isEmpty()) {
                var admin = User.builder()
                        .nom("Admin")
                        .prenom("System")
                        .email("admin@padel.com")
                        .password(passwordEncoder.encode("admin123"))
                        .telephone("00000000")
                        .role(Role.ADMIN)
                        .build();
                repository.save(admin);
                System.out.println("ADMIN USER CREATED: admin@padel.com / admin123");
            }
        };
    }
}
