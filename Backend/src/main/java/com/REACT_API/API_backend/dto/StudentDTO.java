package com.REACT_API.API_backend.dto;

import com.REACT_API.API_backend.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO implements Serializable {

    private Long studentId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;

    public StudentDTO(String username, String email, String firstName, String lastName) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
