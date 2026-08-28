package com.neighbourhub.neighbourhubbackend.controller;

import com.neighbourhub.neighbourhubbackend.model.Listing;
import com.neighbourhub.neighbourhubbackend.repository.ListingRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    private final ListingRepository listingRepository;

    public ListingController(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    @GetMapping
    public List<Listing> getAllListings() {
        return listingRepository.findAll();
    }

    @PostMapping
    public Listing addListing(@RequestBody Listing newListing) {
        return listingRepository.save(newListing);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateListing(@PathVariable Integer id, @RequestBody Listing updatedListing) {

        Optional<Listing> existing = listingRepository.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.status(404).body("Listing not found");
        }

        Listing listing = existing.get();
        listing.setName(updatedListing.getName());
        listing.setPrice(updatedListing.getPrice());
        listing.setSeller(updatedListing.getSeller());

        listingRepository.save(listing);

        return ResponseEntity.ok(listing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteListing(@PathVariable Integer id) {

        if (!listingRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Listing not found");
        }

        listingRepository.deleteById(id);

        return ResponseEntity.ok("Deleted successfully");
    }
}