package com.taskflow.service;
import com.taskflow.domain.*;
import com.taskflow.dto.*;
import com.taskflow.exception.TaskNotFoundException;
import com.taskflow.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {
    @Mock TaskRepository repository;
    @InjectMocks TaskService service;

    @Test
    void create_shouldApplyDefaults() {
        when(repository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));
        TaskResponse res = service.create(new TaskRequest("  Réviser  ", "Desc", LocalDate.of(2025, 1, 10), null, null, "Test"));
        assertThat(res.title()).isEqualTo("Réviser");
        assertThat(res.status()).isEqualTo(TaskStatus.TODO);
        assertThat(res.priority()).isEqualTo(Priority.MEDIUM);
    }
    @Test
    void findById_shouldThrow_whenNotFound() {
        when(repository.findById(42L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> service.findById(42L)).isInstanceOf(TaskNotFoundException.class);
    }
    @Test
    void stats_shouldComputeCorrectly() {
        when(repository.count()).thenReturn(2L);
        when(repository.countByStatus(TaskStatus.DONE)).thenReturn(1L);
        assertThat(service.stats().progressPercent()).isEqualTo(50);
    }
}
