package com.sagnikchakraborty.bookapi.service;

import com.sagnikchakraborty.bookapi.exception.BookNotFoundException;
import com.sagnikchakraborty.bookapi.model.Book;
import com.sagnikchakraborty.bookapi.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAllByOrderByTitle();
    }

    @Override
    public List<Book> getBooksContainingText(String text) {
        return bookRepository
                .findByIsbnContainingOrTitleContainingIgnoreCaseOrderByTitle(text, text);
    }

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book validateAndGetBook(String isbn) {
        return bookRepository.findById(isbn)
                .orElseThrow(() -> new BookNotFoundException(
                        String.format("Book with isbn %s not found", isbn)));
    }

    @Override
    public void deleteBook(Book book) {
        bookRepository.delete(book);
    }
}
