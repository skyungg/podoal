package com.podoal.podoal.domain.todo.service;

import com.podoal.podoal.domain.todo.dto.TodoCreateRequest;
import com.podoal.podoal.domain.todo.dto.TodoResponse;
import com.podoal.podoal.domain.todo.dto.TodoUpdateRequest;
import com.podoal.podoal.domain.todo.entity.ToDoItem;
import com.podoal.podoal.domain.todo.entity.ToDoList;
import com.podoal.podoal.domain.todo.repository.ToDoItemRepository;
import com.podoal.podoal.domain.todo.repository.ToDoListRepository;
import com.podoal.podoal.domain.user.entity.User;
import com.podoal.podoal.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

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

    public List<TodoResponse> getTodos(Long userId, LocalDate date){
        // 1. userId로 회원 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다"));

        // 2. 해당 회원의 ToDoList 조회
        ToDoList toDoList = toDoListRepository.findByUserAndTodoDate(user, date)
                .orElse(null);

        if(toDoList == null) {
            return List.of();
        }

        // 3. ToDoList에 속한 ToDoItem 목록 조회
        List<ToDoItem> toDoItemList = toDoItemRepository.findByTodoList(toDoList);

        // 4. ToDoItem을 TodoResponse로 변환해서 반환
        return toDoItemList.stream()
                .map(TodoResponse::new)
                .toList();
    }

    @Transactional
    public void updaateTodo(Long todoItemId, TodoUpdateRequest todoUpdateRequest){
        // 1. todoItemId로 수정할 todoItem 조회
        ToDoItem todoItem = toDoItemRepository.findById(todoItemId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 투두 아이템입니다"));

        // 2.내용 수정
        todoItem.updateContent(todoUpdateRequest.getContent());

        // 3. 날짜 변경
        ToDoList curTodoList = todoItem.getTodoList();
        User user = curTodoList.getUser();

        ToDoList targetList = toDoListRepository
                .findByUserAndTodoDate(user, todoUpdateRequest.getTodoDate())
                .orElseGet(() -> {
                    ToDoList newList = ToDoList.builder()
                            .user(user)
                            .todoDate(todoUpdateRequest.getTodoDate())
                            .build();

                    return toDoListRepository.save(newList);
                });

        todoItem.changeToDoList(targetList);

    }
}
