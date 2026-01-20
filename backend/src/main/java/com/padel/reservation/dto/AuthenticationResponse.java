package com.padel.reservation.dto;

import com.padel.reservation.entity.Role;

public class AuthenticationResponse {
    private String token;
    private String email;
    private Role role;

    public AuthenticationResponse() {}

    public AuthenticationResponse(String token, String email, Role role) {
        this.token = token;
        this.email = email;
        this.role = role;
    }

    public static AuthenticationResponseBuilder builder() {
        return new AuthenticationResponseBuilder();
    }

    public static class AuthenticationResponseBuilder {
        private String token;
        private String email;
        private Role role;

        public AuthenticationResponseBuilder token(String token) { this.token = token; return this; }
        public AuthenticationResponseBuilder email(String email) { this.email = email; return this; }
        public AuthenticationResponseBuilder role(Role role) { this.role = role; return this; }

        public AuthenticationResponse build() {
            return new AuthenticationResponse(token, email, role);
        }
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
