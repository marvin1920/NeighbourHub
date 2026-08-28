package com.neighbourhub.neighbourhubbackend.repository;

import com.neighbourhub.neighbourhubbackend.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, Integer> {
    List<Listing> findBySociety(String society);
}