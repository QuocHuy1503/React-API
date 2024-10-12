package com.REACT_API.API_backend.dto;

import com.REACT_API.API_backend.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO implements Serializable {

    private Long book_id;
    private String title;
    private String author;
    private Integer published_year;
    private String genre;
    private Boolean available;

    public BookDTO(Book book) {
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.published_year = book.getPublished_year();
        this.genre = book.getGenre();
        this.available = book.getAvailable();
    }
}