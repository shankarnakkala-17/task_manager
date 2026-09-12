package com.taskmanager.repository;

import com.taskmanager.model.Priority;
import com.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Talks to the database. We don't write SQL by hand here -
 * Spring Data JPA generates it from the method names / JpaRepository.
 */
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByPriority(Priority priority);

    List<Task> findByCompleted(boolean completed);
}
