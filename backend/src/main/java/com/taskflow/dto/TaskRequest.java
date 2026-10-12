package com.taskflow.dto;
import com.taskflow.domain.Priority;
import com.taskflow.domain.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
public record TaskRequest(
    @NotBlank(message = "Le titre est obligatoire") @Size(max = 120) String title,
    @Size(max = 2000) String description,
    LocalDate dueDate, TaskStatus status, Priority priority,
    @Size(max = 60) String category
) {}
