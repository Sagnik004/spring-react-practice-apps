package com.sagnikchakraborty.bookapi.rest.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateBookRequest {

    @NotBlank(message = "book isbn number is required")
    private String isbn;

    @NotBlank(message = "book title is required")
    private String title;

    @Override
    public String toString() {
        return "CreateBookRequest{" +
                "isbn='" + isbn + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
