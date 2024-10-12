package com.REACT_API.API_backend.repository;

import com.REACT_API.API_backend.dto.BookDTO;
import com.REACT_API.API_backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<BookDTO> findByTitle(String title);
}