package com.solati.taskmanager.exception;

/**
 * Exception thrown when a task is not found.
 */
public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException(Long id) {

        super("Task with ID " + id + " not found");
    }
}