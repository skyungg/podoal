package com.podoal.podoal.domain.todo.repository;

import com.podoal.podoal.domain.todo.entity.ToDoList;
import com.podoal.podoal.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface ToDoListRepository extends JpaRepository<ToDoList, Long> {
    Optional<ToDoList> findByUserAndTodoDate(User user, LocalDate todoDate);
}
