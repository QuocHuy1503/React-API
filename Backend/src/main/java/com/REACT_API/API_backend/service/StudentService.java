package com.REACT_API.API_backend.service;

import com.REACT_API.API_backend.dto.StudentDTO;
import com.REACT_API.API_backend.entity.Student;
import com.REACT_API.API_backend.repository.StudentRepository;
import org.apache.coyote.BadRequestException;
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

    public StudentDTO createStudent(StudentDTO studentDTO) {
        log.debug("Request to create Student: {}", studentDTO);
        Student student = new Student();
        student.setEmail(studentDTO.getEmail());
        student.setFirst_name(studentDTO.getFirst_name());
        student.setLast_name(studentDTO.getLast_name());
        student.setPassword(studentDTO.getPassword());
        student = studentRepository.save(student);
        StudentDTO studentDTOCreated = new StudentDTO(student);
        studentDTOCreated.setStudent_id(student.getStudent_id()); // Set the student_id explicitly
        return studentDTOCreated;
    }

    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        log.debug("Request to update Student: {}", studentDTO);
        Student student = studentRepository.findById(id).orElse(null);
        if (student == null) {
            log.debug("Student not found");
            return null;
        }

        student.setEmail(studentDTO.getEmail());
        student.setFirst_name(studentDTO.getFirst_name());
        student.setLast_name(studentDTO.getLast_name());
        student.setPassword(studentDTO.getPassword());
        student = studentRepository.save(student);
        StudentDTO studentDTOUpdated = new StudentDTO(student);
        studentDTOUpdated.setStudent_id(student.getStudent_id()); // Set the student_id explicitly
        return studentDTOUpdated;
    }

    public void deleteStudent(Long id) {
        log.debug("Request to delete Student: {}", id);
        studentRepository.deleteById(id);
    }
}
