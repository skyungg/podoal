package com.podoal.podoal.domain.todo.entity;

import com.podoal.podoal.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "todo_item")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ToDoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todoitem_id")
    private Long id;

    @Column(name = "content", length = 200, nullable = false)
    private String content;

    @Column(name = "is_completed", nullable = false)
    private boolean isCompleted;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "todolist_id", nullable = false)
    private ToDoList todoList;

    @Builder
    public ToDoItem(String content, ToDoList todoList) {
        this.content = content;
        this.todoList = todoList;
        this.isCompleted = false;
    }
}
