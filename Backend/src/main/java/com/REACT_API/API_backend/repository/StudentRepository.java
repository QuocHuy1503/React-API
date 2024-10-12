package com.REACT_API.API_backend.repository;

import com.REACT_API.API_backend.dto.StudentDTO;
import com.REACT_API.API_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<StudentDTO> findByEmail(String email);
}
