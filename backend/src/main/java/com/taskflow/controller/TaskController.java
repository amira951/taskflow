package com.taskflow.controller;
import com.taskflow.domain.TaskStatus;
import com.taskflow.dto.*;
import com.taskflow.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService service;
    public TaskController(TaskService service) { this.service = service; }
    @GetMapping
    public List<TaskResponse> list(@RequestParam(required = false) TaskStatus status, @RequestParam(required = false) String category) { return service.findAll(status, category); }
    @GetMapping("/{id}")
    public TaskResponse get(@PathVariable Long id) { return service.findById(id); }
    @PostMapping
    public ResponseEntity<TaskResponse> create(@Valid @RequestBody TaskRequest req) {
        TaskResponse created = service.create(req);
        return ResponseEntity.created(URI.create("/api/tasks/" + created.id())).body(created);
    }
    @PutMapping("/{id}")
    public TaskResponse update(@PathVariable Long id, @Valid @RequestBody TaskRequest req) { return service.update(id, req); }
    @PatchMapping("/{id}/status")
    public TaskResponse changeStatus(@PathVariable Long id, @Valid @RequestBody StatusUpdateRequest req) { return service.changeStatus(id, req.status()); }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
    @GetMapping("/stats")
    public StatsResponse stats() { return service.stats(); }
}
