package com.REACT_API.API_backend.service;

import com.REACT_API.API_backend.dto.StudentDTO;
import com.REACT_API.API_backend.entity.Student;
import com.REACT_API.API_backend.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final Logger log = LoggerFactory.getLogger(StudentService.class);


    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository ){
        this.studentRepository = studentRepository;
    }

    public Page<StudentDTO> getStudents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        log.debug("Request to getStudents pageable: {}", pageable);
        return studentRepository.findAll(pageable).map(StudentDTO::new);
    }
    
    public StudentDTO getStudent(Long id){
        log.debug("Request to getStudent: {}", id);
        return studentRepository.findById(id).map(StudentDTO::new).orElse(null);
    }

    public StudentDTO createStudent(StudentDTO StudentDTO) {
        log.debug("Request to create Student: {}", StudentDTO);
        Student student = new Student();

        student.setEmail(StudentDTO.getEmail());
        student.setUsername(StudentDTO.getUsername());
        student.setFirst_name(StudentDTO.getFirst_name());
        student.setLast_name(StudentDTO.getLast_name());
        student.setPassword(StudentDTO.getPassword());

        student = studentRepository.save(student);
        return new StudentDTO(student);
    }

    public StudentDTO updateStudent(Long id, StudentDTO StudentDTO) {
        log.debug("Request to update Student: {}", StudentDTO);
        Student Student = studentRepository.findById(id).orElse(null);
        if (Student == null) {
            log.debug("Student not found");
            return null;
        }

        Student student = new Student();

        student.setEmail(StudentDTO.getEmail());
        student.setUsername(StudentDTO.getUsername());
        student.setFirst_name(StudentDTO.getFirst_name());
        student.setLast_name(StudentDTO.getLast_name());
        student.setPassword(StudentDTO.getPassword());

        student = studentRepository.save(student);
        return new StudentDTO(student);
    }

    public void deleteStudent(Long id) {
        log.debug("Request to delete Student: {}", id);
        studentRepository.deleteById(id);
    }
}
