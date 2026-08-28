package com.neighbourhub.neighbourhubbackend.repository;

import com.neighbourhub.neighbourhubbackend.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Integer> {
    List<Issue> findBySociety(String society);
}