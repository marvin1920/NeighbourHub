package com.neighbourhub.neighbourhubbackend.controller;

import com.neighbourhub.neighbourhubbackend.model.Issue;
import com.neighbourhub.neighbourhubbackend.repository.IssueRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueRepository issueRepository;

    public IssueController(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    @GetMapping
    public List<Issue> getAllIssues(@RequestParam(required = false) String society) {
        if (society != null) {
            return issueRepository.findBySociety(society);
        }
        return issueRepository.findAll();
    }

    @PostMapping
    public Issue addIssue(@RequestBody Issue newIssue) {
        return issueRepository.save(newIssue);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIssue(@PathVariable Integer id) {

        if (!issueRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Issue not found");
        }

        issueRepository.deleteById(id);

        return ResponseEntity.ok("Deleted successfully");
    }
}