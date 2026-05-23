package com.solati.taskmanager.service.interfaces;

import com.solati.taskmanager.entity.Task;

import java.util.List;
import java.util.Optional;

/**
 * Service interface for task operations.
 */
public interface TaskService {

    List<Task> getAllTasks();

    Optional<Task> getTaskById(Long id);

    Task createTask(Task task);

    Task updateTask(Long id, Task task);

    void deleteTask(Long id);
}