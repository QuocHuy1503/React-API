package com.REACT_API.API_backend.controller;

import com.REACT_API.API_backend.dto.BookDTO;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.REACT_API.API_backend.repository.BookRepository;
import com.REACT_API.API_backend.service.BookService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private final Logger log = LoggerFactory.getLogger(BookDTO.class);
    private final BookService bookService;
    private final HttpHeaders headers = new HttpHeaders();

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public ResponseEntity<List<BookDTO>> getBooks(@RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "20") int size,
                                                  @RequestParam(value = "sort", defaultValue = "book_id") String sort) {
        log.debug("REST request to get Books");
        Page<BookDTO> pageable = bookService.getBooks(page, size);
        return ResponseEntity.ok().headers(headers).body(pageable.getContent());
    }

    @GetMapping("/book/{book_id}")
    public ResponseEntity<BookDTO> getBook(@PathVariable Long book_id) {
        log.debug("REST request to get Book : {}", book_id);
        return ResponseEntity.ok().headers(headers).body(bookService.getBook(book_id));
    }

    @PostMapping("/books")
    public ResponseEntity<BookDTO> createBook(@Valid @RequestBody BookDTO bookDTO) throws URISyntaxException {
        log.debug("REST request to save Book : {}", bookDTO);
        BookDTO result = bookService.createBook(bookDTO);
        return ResponseEntity.created(new URI("api/Books/" + result.getBook_id())).headers(headers).body(result);
    }

    @PutMapping("/book/{book_id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long book_id, @Valid @RequestBody BookDTO bookDTO) throws BadRequestException {
        log.debug("REST request to update Book : {}", bookDTO);
        if(!bookDTO.getBook_id().equals(book_id)) {
            throw new BadRequestException("Invalid ID");
        }
        BookDTO result = bookService.updateBook(book_id, bookDTO);
        return ResponseEntity.ok().headers(headers).body(result);
    }

    @DeleteMapping("/book/{book_id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long book_id) {
        log.debug("REST request to delete Book : {}", book_id);
        bookService.deleteBook(book_id);
        return ResponseEntity.noContent().headers(headers).build();
    }
}