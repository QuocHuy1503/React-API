package com.REACT_API.API_backend.service;

import com.REACT_API.API_backend.dto.UserDTO;
import com.REACT_API.API_backend.dto.UserDTO;
import com.REACT_API.API_backend.entity.User;
import com.REACT_API.API_backend.entity.User;
import com.REACT_API.API_backend.repository.BookRepository;
import com.REACT_API.API_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final Logger log = LoggerFactory.getLogger(BookService.class);

    private final BookRepository bookRepository;

    public Page<UserDTO> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        log.debug("Request to getUsers pageable: {}", pageable);
        Page<User> users = userRepository.findAll(pageable);
        return users.map(user -> {
            UserDTO userDTO = new UserDTO(user);
            userDTO.setId(user.getId()); // Set the User_id explicitly
            return userDTO;
        });
    }

    public UserDTO getUser(Long id){
        log.debug("Request to getUser: {}", id);
        return userRepository.findById(id).map(UserDTO::new).orElse(null);
    }

    public UserDTO createUser(UserDTO UserDTO) {
        log.debug("Request to create User: {}", UserDTO);
        User User = new User();
        User.setEmail(UserDTO.getEmail());
        User.setFirst_name(UserDTO.getFirst_name());
        User.setLast_name(UserDTO.getLast_name());
        User.setPassword(UserDTO.getPassword());
        User = userRepository.save(User);
        UserDTO UserDTOCreated = new UserDTO(User);
        UserDTOCreated.setId(User.getId()); // Set the User_id explicitly
        return UserDTOCreated;
    }

    public UserDTO updateUser(Long id, UserDTO UserDTO) {
        log.debug("Request to update User: {}", UserDTO);
        User User = userRepository.findById(id).orElse(null);
        if (User == null) {
            log.debug("User not found");
            return null;
        }

        User.setEmail(UserDTO.getEmail());
        User.setFirst_name(UserDTO.getFirst_name());
        User.setLast_name(UserDTO.getLast_name());
        User.setPassword(UserDTO.getPassword());
        User = userRepository.save(User);
        UserDTO UserDTOUpdated = new UserDTO(User);
        UserDTOUpdated.setId(User.getId()); // Set the User_id explicitly
        return UserDTOUpdated;
    }

    public void deleteUser(Long id) {
        log.debug("Request to delete User: {}", id);
        userRepository.deleteById(String.valueOf(id));
    }
}