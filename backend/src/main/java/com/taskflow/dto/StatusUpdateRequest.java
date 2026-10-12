package com.taskflow.dto;
import com.taskflow.domain.TaskStatus;
import jakarta.validation.constraints.NotNull;
public record StatusUpdateRequest(@NotNull TaskStatus status) {}
