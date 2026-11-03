package com.podoal.podoal.domain.todo.controller;

import com.podoal.podoal.domain.todo.dto.TodoCreateRequest;
import com.podoal.podoal.domain.todo.dto.TodoResponse;
import com.podoal.podoal.domain.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<TodoResponse>> getTodos(@RequestParam("userId") Long userId, @RequestParam("localDate") LocalDate localDate){
        List<TodoResponse> todoResponseList = todoService.getTodos(userId, localDate);

        return ResponseEntity.ok(todoResponseList);
    }
}
