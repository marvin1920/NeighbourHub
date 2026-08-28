package com.neighbourhub.neighbourhubbackend.controller;

import com.neighbourhub.neighbourhubbackend.model.Event;
import com.neighbourhub.neighbourhubbackend.repository.EventRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @PostMapping
    public Event addEvent(@RequestBody Event newEvent) {
        return eventRepository.save(newEvent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Integer id, @RequestBody Event updatedEvent) {

        Optional<Event> existing = eventRepository.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.status(404).body("Event not found");
        }

        Event event = existing.get();
        event.setName(updatedEvent.getName());
        event.setDate(updatedEvent.getDate());
        event.setTime(updatedEvent.getTime());
        event.setLocation(updatedEvent.getLocation());
        event.setOrganizer(updatedEvent.getOrganizer());

        eventRepository.save(event);

        return ResponseEntity.ok(event);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Integer id) {

        if (!eventRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Event not found");
        }

        eventRepository.deleteById(id);

        return ResponseEntity.ok("Deleted successfully");
    }
}