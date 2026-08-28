package com.neighbourhub.neighbourhubbackend.controller;

import com.neighbourhub.neighbourhubbackend.model.Service;
import com.neighbourhub.neighbourhubbackend.repository.ServiceRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceRepository serviceRepository;

    public ServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public List<Service> getAllServices(@RequestParam(required = false) String society) {
        if (society != null) {
            return serviceRepository.findBySociety(society);
        }
        return serviceRepository.findAll();
    }

    @PostMapping
    public Service addService(@RequestBody Service newService) {
        return serviceRepository.save(newService);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateService(@PathVariable Integer id, @RequestBody Service updatedService) {

        Optional<Service> existing = serviceRepository.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.status(404).body("Service not found");
        }

        Service service = existing.get();
        service.setName(updatedService.getName());
        service.setCategory(updatedService.getCategory());
        service.setProvider(updatedService.getProvider());
        service.setContact(updatedService.getContact());
        service.setSociety(updatedService.getSociety());

        serviceRepository.save(service);

        return ResponseEntity.ok(service);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Integer id) {

        if (!serviceRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Service not found");
        }

        serviceRepository.deleteById(id);

        return ResponseEntity.ok("Deleted successfully");
    }
}