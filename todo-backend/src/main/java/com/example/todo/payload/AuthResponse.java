package com.example.todo.payload;

public class AuthResponse {
    private String token;
    private UserInfo user;

    public AuthResponse(String token, UserInfo user) {
        this.token = token; 
        this.user = user;
    }

    public String getToken() { return token; }
    public UserInfo getUser() { return user; }

    public static class UserInfo {
        private String email;
        private String fullName;

        public UserInfo(String email, String fullName) {
            this.email = email;
            this.fullName = fullName;
        }

        public String getEmail() { return email; }
        public String getFullName() { return fullName; }
    }
}