package com.podoal.podoal.domain.todo.dto;

import com.podoal.podoal.domain.todo.entity.ToDoItem;
import lombok.Getter;

@Getter
public class TodoResponse {
    private Long todoItemId;
    private String content;
    private boolean isCompleted;

    public TodoResponse(ToDoItem toDoItem){
        this.todoItemId = toDoItem.getId();
        this.content = toDoItem.getContent();
        this.isCompleted = toDoItem.isCompleted();
    }
}
