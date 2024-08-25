package com.sagnikchakraborty.springbootlibrarymgmt.dao;

import com.sagnikchakraborty.springbootlibrarymgmt.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
