package com.sagnikchakraborty.bookapi.mapper;

import com.sagnikchakraborty.bookapi.model.Book;
import com.sagnikchakraborty.bookapi.rest.dto.BookDto;
import com.sagnikchakraborty.bookapi.rest.dto.CreateBookRequest;

public interface BookMapper {

    Book toBook(CreateBookRequest createBookRequest);

    BookDto toBookDto(Book book);
}
