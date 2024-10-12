package com.REACT_API.API_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="students")
public class Student implements Serializable  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "id")
    private Long id;


    @Column(nullable = false, name = "password")
    private String password;

    @Column(nullable = false, name = "email")
    private String email;

    @Column(nullable = false, name = "first_name")
    private String first_name;

    @Column(nullable = false, name = "last_name")
    private String last_name;


}
