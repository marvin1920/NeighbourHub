package com.neighbourhub.neighbourhubbackend.repository;

import com.neighbourhub.neighbourhubbackend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
}