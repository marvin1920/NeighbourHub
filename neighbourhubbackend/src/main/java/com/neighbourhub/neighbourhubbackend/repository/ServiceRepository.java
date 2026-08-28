package com.neighbourhub.neighbourhubbackend.repository;

import com.neighbourhub.neighbourhubbackend.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Integer> {
    List<Service> findBySociety(String society);
}