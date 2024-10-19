package com.REACT_API.API_backend.dto;

import com.REACT_API.API_backend.entity.Student;
import com.REACT_API.API_backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO implements Serializable {

    private Long id;
    private String email;
    private String first_name;
    private String last_name;
    private String password;

    public UserDTO(User user) {
        this.email = user.getEmail();
        this.first_name = user.getFirst_name();
        this.last_name = user.getLast_name();
        this.password = user.getPassword();
    }
}
