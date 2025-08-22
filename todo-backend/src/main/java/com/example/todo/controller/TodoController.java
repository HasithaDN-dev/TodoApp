package com.example.todo.controller;

import com.example.todo.model.Todo;
import com.example.todo.payload.TodoRequest;
import com.example.todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService todoService;
    public TodoController(TodoService todoService) { this.todoService = todoService; }

    @GetMapping
    public List<Todo> list(Authentication auth) {
        return todoService.list(auth.getName());
    }

    @PostMapping
    public Todo create(Authentication auth, @Valid @RequestBody TodoRequest req) {
        return todoService.create(auth.getName(), req);
    }

    @PutMapping("/{id}")
    public Todo update(Authentication auth, @PathVariable Long id, @RequestBody TodoRequest req) {
        return todoService.update(auth.getName(), id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication auth, @PathVariable Long id) {
        todoService.delete(auth.getName(), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/complete-overdue")
    public Map<String, Object> completeOverdue(Authentication auth, @RequestParam String dueBefore) {
        return todoService.completeOverdue(auth.getName(), dueBefore);
    }

    @GetMapping("/stats")
    public Map<String, Object> stats(Authentication auth) {
        return todoService.stats(auth.getName());
    }
}
