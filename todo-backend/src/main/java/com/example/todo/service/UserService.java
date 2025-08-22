package com.example.todo.service;

import com.example.todo.model.User;
import com.example.todo.payload.AuthResponse;
import com.example.todo.payload.LoginRequest;
import com.example.todo.payload.RegisterRequest;
import com.example.todo.repository.UserRepository;
import com.example.todo.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        User u = new User();
        u.setEmail(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setFullName(req.getFullName());
        u.setRole("ROLE_USER");
        userRepository.save(u);
        String token = jwtService.generateToken(u.getEmail(), Map.of("role", u.getRole()));
        return new AuthResponse(token, u.getEmail(), u.getFullName());
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        User u = userRepository.findByEmail(req.getEmail()).orElseThrow();
        String token = jwtService.generateToken(u.getEmail(), Map.of("role", u.getRole()));
        return new AuthResponse(token, u.getEmail(), u.getFullName());
    }
}