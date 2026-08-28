package com.neighbourhub.neighbourhubbackend.repository;

import com.neighbourhub.neighbourhubbackend.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingRepository extends JpaRepository<Listing, Integer> {
}