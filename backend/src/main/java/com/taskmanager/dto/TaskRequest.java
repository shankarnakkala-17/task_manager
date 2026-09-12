package com.taskmanager.dto;

import com.taskmanager.model.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * What the client SENDS to us when creating or updating a task.
 * We never expose the Task entity directly to the outside world -
 * that's a common professional practice so the API contract and the
 * database schema can evolve independently.
 */
@Getter
@Setter
public class TaskRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title must be under 150 characters")
    private String title;

    @Size(max = 1000, message = "Description must be under 1000 characters")
    private String description;

    @NotNull(message = "Priority is required")
    private Priority priority;

    // Optional - null means "no due date"
    private LocalDate dueDate;

    private boolean completed;
}