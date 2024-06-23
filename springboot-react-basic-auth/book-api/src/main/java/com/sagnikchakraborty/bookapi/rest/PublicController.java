package com.sagnikchakraborty.bookapi.rest;

import com.sagnikchakraborty.bookapi.model.User;
import com.sagnikchakraborty.bookapi.service.BookService;
import com.sagnikchakraborty.bookapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @GetMapping("/numberOfUsers")
    public Integer getNumberOfUsers() {
        return userService.getAllUsers().size();
    }

    @GetMapping("/numberOfBooks")
    public Integer getNumberOfBooks() {
        return bookService.getAllBooks().size();
    }
}
