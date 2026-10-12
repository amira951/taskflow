package com.taskflow.service;
import com.taskflow.domain.*;
import com.taskflow.dto.*;
import com.taskflow.exception.TaskNotFoundException;
import com.taskflow.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class TaskService {
    private final TaskRepository repository;
    public TaskService(TaskRepository repository) { this.repository = repository; }

    @Transactional(readOnly = true)
    public List<TaskResponse> findAll(TaskStatus status, String category) {
        List<Task> tasks = (status == null) ? repository.findAllByOrderByCreatedAtDesc() : repository.findByStatusOrderByCreatedAtDesc(status);
        return tasks.stream()
                .filter(t -> category == null || category.isBlank() || (t.getCategory() != null && t.getCategory().equalsIgnoreCase(category)))
                .map(TaskResponse::from).toList();
    }
    @Transactional(readOnly = true)
    public TaskResponse findById(Long id) { return TaskResponse.from(getOrThrow(id)); }
    public TaskResponse create(TaskRequest req) { Task task = new Task(); apply(task, req); return TaskResponse.from(repository.save(task)); }
    public TaskResponse update(Long id, TaskRequest req) { Task task = getOrThrow(id); apply(task, req); return TaskResponse.from(repository.save(task)); }
    public TaskResponse changeStatus(Long id, TaskStatus status) { Task task = getOrThrow(id); task.setStatus(status); return TaskResponse.from(repository.save(task)); }
    public void delete(Long id) { if (!repository.existsById(id)) throw new TaskNotFoundException(id); repository.deleteById(id); }
    @Transactional(readOnly = true)
    public StatsResponse stats() {
        long total = repository.count();
        long todo = repository.countByStatus(TaskStatus.TODO);
        long inProgress = repository.countByStatus(TaskStatus.IN_PROGRESS);
        long done = repository.countByStatus(TaskStatus.DONE);
        int percent = (total == 0) ? 0 : (int) Math.round(done * 100.0 / total);
        return new StatsResponse(total, todo, inProgress, done, percent);
    }
    private Task getOrThrow(Long id) { return repository.findById(id).orElseThrow(() -> new TaskNotFoundException(id)); }
    private void apply(Task task, TaskRequest req) {
        task.setTitle(req.title().trim());
        task.setDescription(req.description());
        task.setDueDate(req.dueDate());
        task.setStatus(req.status() != null ? req.status() : TaskStatus.TODO);
        task.setPriority(req.priority() != null ? req.priority() : Priority.MEDIUM);
        task.setCategory(req.category());
    }
}
