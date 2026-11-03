package com.podoal.podoal.domain.todo.controller;

import com.podoal.podoal.domain.todo.dto.TodoCreateRequest;
import com.podoal.podoal.domain.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todos")
public class ToDoController {
    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<Void> createTodo(@RequestBody TodoCreateRequest todoCreateRequest){
        todoService.createTodo(todoCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
