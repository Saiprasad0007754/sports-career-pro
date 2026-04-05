package com.careerpro.service;

import com.careerpro.dto.AuthResponse;
import com.careerpro.dto.LoginRequest;
import com.careerpro.dto.RegisterRequest;
import com.careerpro.model.User;
import com.careerpro.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        // Simple implementation without Spring Security / Password Encoder
        user.setPassword(request.getPassword());
        
        userRepository.save(user);

        return new AuthResponse(user.getName(), user.getEmail(), "Registration successful");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return new AuthResponse(user.getName(), user.getEmail(), "Login successful");
    }
}
