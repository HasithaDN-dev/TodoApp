package com.example.todo.payload;

import jakarta.validation.constraints.*;

public class TodoRequest {
    @NotBlank
    private String title;
    private String description;
    private String dueDate; // ISO string, parsed server-side
    private Boolean completed;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }
    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
}