package com.podoal.podoal.domain.todo.entity;

import com.podoal.podoal.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "todo_list",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_todo_list_user_date",
                        columnNames = {"user_id", "todo_date"}
                )
        }
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ToDoList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todolist_id")
    private Long id;

    @Column(name = "todo_date", nullable = false, updatable = false)
    private LocalDate todoDate;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    public ToDoList(LocalDate todoDate, User user) {
        this.todoDate = todoDate;
        this.user = user;
    }

}
