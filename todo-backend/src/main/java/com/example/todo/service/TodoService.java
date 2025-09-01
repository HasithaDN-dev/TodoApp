package com.example.todo.service;

import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.payload.TodoRequest;
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

@Service
public class TodoService {
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoService(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    private User requireUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Todo> list(String email) {
        User u = requireUser(email);
        return todoRepository.findByUserOrderByCreatedAtDesc(u);
    }

    public Todo create(String email, TodoRequest req) {
        User u = requireUser(email);
        Todo t = new Todo();
        t.setUser(u);
        t.setTitle(req.getTitle());
        t.setDescription(req.getDescription());
        if (req.getDueDate() != null && !req.getDueDate().isBlank()) {
            try { t.setDueDate(LocalDateTime.parse(req.getDueDate())); } catch (DateTimeParseException ignored) {}
        }
        return todoRepository.save(t);
    }

    public Todo update(String email, Long id, TodoRequest req) {
        User u = requireUser(email);
        Todo t = todoRepository.findById(id).orElseThrow();
        if (!t.getUser().getId().equals(u.getId())) throw new RuntimeException("Forbidden");
        if (req.getTitle() != null) t.setTitle(req.getTitle());
        if (req.getDescription() != null) t.setDescription(req.getDescription());
        if (req.getCompleted() != null) t.setCompleted(req.getCompleted());
        if (req.getDueDate() != null && !req.getDueDate().isBlank()) {
            try { t.setDueDate(LocalDateTime.parse(req.getDueDate())); } catch (DateTimeParseException ignored) {}
        }
        t.setUpdatedAt(LocalDateTime.now());
        return todoRepository.save(t);
    }

    public void delete(String email, Long id) {
        User u = requireUser(email);
        Todo t = todoRepository.findById(id).orElseThrow();
        if (!t.getUser().getId().equals(u.getId())) throw new RuntimeException("Forbidden");
        todoRepository.delete(t);
    }

    public Map<String, Object> completeOverdue(String email, String dueBeforeIso) {
        User u = requireUser(email);
        LocalDateTime dueBefore = LocalDateTime.parse(dueBeforeIso);
        
        List<Todo> overdueTodos = todoRepository.findByUserAndDueDateBeforeAndCompletedFalse(u, dueBefore);
        int affected = 0;
        for (Todo todo : overdueTodos) {
            todo.setCompleted(true);
            todo.setUpdatedAt(LocalDateTime.now());
            todoRepository.save(todo);
            affected++;
        }
        
        return Map.of("affected", affected);
    }

    public Map<String, Object> stats(String email) {
        User u = requireUser(email);
        long pending = todoRepository.countByUserAndCompletedFalse(u);
        long done = todoRepository.countByUserAndCompletedTrue(u);
        return Map.of("pending", pending, "done", done);
    }
}