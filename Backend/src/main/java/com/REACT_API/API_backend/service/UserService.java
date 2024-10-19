package com.REACT_API.API_backend.service;

import com.REACT_API.API_backend.entity.User;
import com.REACT_API.API_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll(); // Fetch all users from the repository
    }
}