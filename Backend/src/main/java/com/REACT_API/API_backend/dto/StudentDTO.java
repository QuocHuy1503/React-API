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

    private Long student_id;
    private String username;
    private String email;
    private String first_name;
    private String last_name;
    private String password;

    public StudentDTO(Student student) {
        this.username = username;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
    }

}
