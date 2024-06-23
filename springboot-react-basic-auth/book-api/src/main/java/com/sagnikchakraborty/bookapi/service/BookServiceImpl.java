package com.sagnikchakraborty.bookapi.service;

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
}
