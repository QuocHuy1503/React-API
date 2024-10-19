package com.REACT_API.API_backend.controller;


import com.REACT_API.API_backend.dto.UserDTO;
import com.REACT_API.API_backend.service.UserService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final Logger log = LoggerFactory.getLogger(UserDTO.class);
    private final UserService UserService;
    private final HttpHeaders headers = new HttpHeaders();


    public UserController(UserService UserService) {
        this.UserService = UserService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getUsers(@RequestParam(value = "page", defaultValue = "0") int page,
                                                    @RequestParam(value = "size", defaultValue = "20") int size,
                                                    @RequestParam(value = "sort", defaultValue = "id") String sort) {
        log.debug("REST request to get Students");
        Page<UserDTO> pageable = UserService.getUsers(page, size);
        return ResponseEntity.ok().headers(headers).body(pageable.getContent());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        log.debug("REST request to get Student : {}", id);
        return ResponseEntity.ok().headers(headers).body(UserService.getUser(id));
    }

    @PostMapping("/users")
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO UserDTO) throws URISyntaxException {
        log.debug("REST request to save Student : {}", UserDTO);
        UserDTO result = UserService.createUser(UserDTO);
        return ResponseEntity.created(new URI("api/Students/" + result.getId())).headers(headers).body(result);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO UserDTO) throws BadRequestException {
        log.debug("REST request to update Student : {}", UserDTO);
        if(!UserDTO.getId().equals(id)) {
            throw new BadRequestException("Invalid ID");
        }
        UserDTO result = UserService.updateUser(id, UserDTO);
        return ResponseEntity.ok().headers(headers).body(result);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        log.debug("REST request to delete Student : {}", id);
        UserService.deleteUser(id);
        return ResponseEntity.noContent().headers(headers).build();
    }
}
