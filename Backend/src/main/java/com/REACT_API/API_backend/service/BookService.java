package com.REACT_API.API_backend.service;

import com.REACT_API.API_backend.dto.BookDTO;
import com.REACT_API.API_backend.entity.Book;
import com.REACT_API.API_backend.repository.BookRepository;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final Logger log = LoggerFactory.getLogger(BookService.class);

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Page<BookDTO> getBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        log.debug("Request to getBooks pageable: {}", pageable);
        Page<Book> books = bookRepository.findAll(pageable);
        return books.map(book -> {
            BookDTO bookDTO = new BookDTO(book);
            bookDTO.setBook_id(book.getBook_id()); // Set the book_id explicitly
            return bookDTO;
        });
    }

    public BookDTO getBook(Long book_id) {
        log.debug("Request to getBook: {}", book_id);
        return bookRepository.findById(book_id).map(BookDTO::new).orElse(null);
    }

    public BookDTO createBook(BookDTO bookDTO) {
        log.debug("Request to create Book: {}", bookDTO);
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setPublished_year(bookDTO.getPublished_year());
        book.setGenre(bookDTO.getGenre());
        book.setAvailable(bookDTO.getAvailable());
        book.setImage(bookDTO.getImage());
        book = bookRepository.save(book);
        BookDTO bookDTOCreated = new BookDTO(book);
        bookDTOCreated.setBook_id(book.getBook_id()); // Set the book_id explicitly
        return bookDTOCreated;
    }

    public BookDTO updateBook(Long book_id, BookDTO bookDTO) {
        log.debug("Request to update Book: {}", bookDTO);
        Book book = bookRepository.findById(book_id).orElse(null);
        if (book == null) {
            log.debug("Book not found");
            return null;
        }

        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setPublished_year(bookDTO.getPublished_year());
        book.setGenre(bookDTO.getGenre());
        book.setAvailable(bookDTO.getAvailable());
        book.setImage(bookDTO.getImage());
        book = bookRepository.save(book);
        BookDTO bookDTOUpdated = new BookDTO(book);
        bookDTOUpdated.setBook_id(book.getBook_id()); // Set the book_id explicitly
        return bookDTOUpdated;
    }

    public void deleteBook(Long book_id) {
        log.debug("Request to delete Book: {}", book_id);
        bookRepository.deleteById(book_id);
    }
}