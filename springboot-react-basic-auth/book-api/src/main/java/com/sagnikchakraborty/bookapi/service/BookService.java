package com.sagnikchakraborty.bookapi.service;

import com.sagnikchakraborty.bookapi.model.Book;

import java.util.List;

public interface BookService {

    List<Book> getAllBooks();

    List<Book> getBooksContainingText(String text);

    Book saveBook(Book book);

    Book validateAndGetBook(String isbn);

    void deleteBook(Book book);
}
