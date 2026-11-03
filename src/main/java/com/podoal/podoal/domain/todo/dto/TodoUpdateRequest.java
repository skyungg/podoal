package com.podoal.podoal.domain.todo.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class TodoUpdateRequest {
    private String content;
    private LocalDate todoDate;
}
