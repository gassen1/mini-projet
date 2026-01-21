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
    public CommandLineRunner commandLineRunner(
            UserRepository repository, 
            com.padel.reservation.repository.TerrainRepository terrainRepository,
            PasswordEncoder passwordEncoder
    ) {
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

            if (terrainRepository.count() == 0) {
                var t1 = com.padel.reservation.entity.Terrain.builder()
                        .nom("Court Central")
                        .description("Premium panorama court with professional lighting.")
                        .localisation("Zone A - North")
                        .prix(40.0)
                        .etat("DISPONIBLE")
                        .imageUrl("https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800")
                        .build();
                
                var t2 = com.padel.reservation.entity.Terrain.builder()
                        .nom("Blue Court")
                        .description("Fast surface, perfect for high-intensity matches.")
                        .localisation("Zone B - East")
                        .prix(35.0)
                        .etat("DISPONIBLE")
                        .imageUrl("https://images.unsplash.com/photo-1599474924187-334a49422e75?auto=format&fit=crop&q=80&w=800")
                        .build();

                terrainRepository.saveAll(java.util.List.of(t1, t2));
                System.out.println("INITIAL TERRAINS CREATED");
            }
        };
    }
}
