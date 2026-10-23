package com.podoal.podoal.domain.todo.repository;

import com.podoal.podoal.domain.todo.entity.ToDoItem;
import com.podoal.podoal.domain.todo.entity.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long> {
    List<ToDoItem> findByToDoList(ToDoList toDoList);
}
