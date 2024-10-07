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

    private Integer student_id;
    private String email;
    private String first_name;
    private String last_name;
    private String password;

    public StudentDTO(Student student) {
        this.email = student.getEmail();
        this.first_name = student.getFirst_name();
        this.last_name = student.getLast_name();
        this.password = student.getPassword();
    }
}
