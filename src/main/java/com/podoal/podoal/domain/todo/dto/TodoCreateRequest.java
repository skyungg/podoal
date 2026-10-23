package com.podoal.podoal.domain.todo.dto;

import java.time.LocalDate;

public class TodoCreateRequest {
    Long userId;
    String content;
    LocalDate todoDate;
}
