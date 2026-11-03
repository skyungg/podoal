package com.podoal.podoal.domain.todo.service;

import com.podoal.podoal.domain.todo.dto.TodoCreateRequest;
import com.podoal.podoal.domain.todo.entity.ToDoItem;
import com.podoal.podoal.domain.todo.entity.ToDoList;
import com.podoal.podoal.domain.todo.repository.ToDoItemRepository;
import com.podoal.podoal.domain.todo.repository.ToDoListRepository;
import com.podoal.podoal.domain.user.entity.User;
import com.podoal.podoal.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final UserRepository userRepository;
    private final ToDoListRepository toDoListRepository;
    private final ToDoItemRepository toDoItemRepository;

    @Transactional
    public void createTodo(TodoCreateRequest todoCreateRequest){
        // 1. user 조회 하기
        User user = userRepository.findById(todoCreateRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        // 2. 해당 회원의 날짜별 TodoList 조회
        ToDoList toDoList = toDoListRepository
                .findByUserAndTodoDate(user, todoCreateRequest.getTodoDate())
                .orElseGet(() -> {
                    ToDoList newTodoList = ToDoList.builder()
                            .user(user)
                            .todoDate(todoCreateRequest.getTodoDate())
                            .build();

                    return toDoListRepository.save(newTodoList);
                });

        // 3. 입력한 투두 내용
        ToDoItem toDoItem = ToDoItem.builder()
                .content(todoCreateRequest.getContent())
                .todoList(toDoList)
                .build();

        toDoItemRepository.save(toDoItem);
    }
}
