package com.sagnikchakraborty.bookapi.rest;

import com.sagnikchakraborty.bookapi.mapper.BookMapper;
import com.sagnikchakraborty.bookapi.model.Book;
import com.sagnikchakraborty.bookapi.rest.dto.BookDto;
import com.sagnikchakraborty.bookapi.rest.dto.CreateBookRequest;
import com.sagnikchakraborty.bookapi.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookMapper bookMapper;

    @GetMapping
    public List<BookDto> getBooks(
            @RequestParam(value = "text", required = false) String text) {
        List<Book> books = (text == null) ?
                bookService.getAllBooks() : bookService.getBooksContainingText(text);
        return books.stream()
                .map(bookMapper::toBookDto)
                .collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public BookDto createBook(
            @Valid @RequestBody CreateBookRequest createBookRequest) {
        Book bookToSave = bookMapper.toBook(createBookRequest);
        Book savedBook = bookService.saveBook(bookToSave);
        return bookMapper.toBookDto(savedBook);
    }

    @DeleteMapping("/{isbn}")
    public BookDto deleteBook(@PathVariable String isbn) {
        Book book = bookService.validateAndGetBook(isbn);
        bookService.deleteBook(book);
        return bookMapper.toBookDto(book);
    }
}
