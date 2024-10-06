package com.REACT_API.API_backend.controller;



import com.REACT_API.API_backend.dto.StudentDTO;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.REACT_API.API_backend.repository.StudentRepository;
import com.REACT_API.API_backend.service.StudentService;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3001")
public class StudentController {
    private final Logger log = LoggerFactory.getLogger(StudentDTO.class);
    private final StudentService StudentService;
    private final HttpHeaders headers = new HttpHeaders();


    public StudentController(StudentService StudentService) {
        this.StudentService = StudentService;
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentDTO>> getStudents(@RequestParam(value = "page", defaultValue = "0") int page,
                                                    @RequestParam(value = "size", defaultValue = "20") int size,
                                                    @RequestParam(value = "sort", defaultValue = "id") String sort) {
        log.debug("REST request to get Students");
        Page<StudentDTO> pageable = StudentService.getStudents(page, size);
        return ResponseEntity.ok().headers(headers).body(pageable.getContent());
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<StudentDTO> getStudent(@PathVariable Long id) {
        log.debug("REST request to get Student : {}", id);
        return ResponseEntity.ok().headers(headers).body(StudentService.getStudent(id));
    }

    @PostMapping("/students")
    public ResponseEntity<StudentDTO> createStudent(@Valid @RequestBody StudentDTO StudentDTO) throws URISyntaxException {
        log.debug("REST request to save Student : {}", StudentDTO);
        StudentDTO result = StudentService.createStudent(StudentDTO);
        return ResponseEntity.created(new URI("api/Students/" + result.getStudent_id())).headers(headers).body(result);
    }

    @PutMapping("/student/{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @Valid @RequestBody StudentDTO StudentDTO) throws BadRequestException {
        log.debug("REST request to update Student : {}", StudentDTO);
        if(!StudentDTO.getStudent_id().equals(id)) {
            throw new BadRequestException("Invalid ID");
        }
        StudentDTO result = StudentService.updateStudent(id, StudentDTO);
        return ResponseEntity.ok().headers(headers).body(result);
    }

    @DeleteMapping("/student/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        log.debug("REST request to delete Student : {}", id);
        StudentService.deleteStudent(id);
        return ResponseEntity.noContent().headers(headers).build();
    }
}
