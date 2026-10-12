package com.taskflow.dto;
import com.taskflow.domain.*;
import java.time.Instant;
import java.time.LocalDate;
public record TaskResponse(Long id, String title, String description, LocalDate dueDate, TaskStatus status, Priority priority, String category, Instant createdAt, Instant updatedAt) {
    public static TaskResponse from(Task t) {
        return new TaskResponse(t.getId(), t.getTitle(), t.getDescription(), t.getDueDate(), t.getStatus(), t.getPriority(), t.getCategory(), t.getCreatedAt(), t.getUpdatedAt());
    }
}
