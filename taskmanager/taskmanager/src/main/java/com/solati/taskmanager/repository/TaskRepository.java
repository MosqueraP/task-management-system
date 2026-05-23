package com.solati.taskmanager.repository;

import com.solati.taskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for Task entity.
 * Provides CRUD operations automatically.
 */
public interface TaskRepository extends JpaRepository<Task, Long> {
}
