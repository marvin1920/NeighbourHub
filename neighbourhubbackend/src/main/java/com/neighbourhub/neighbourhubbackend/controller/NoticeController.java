package com.neighbourhub.neighbourhubbackend.controller;

import com.neighbourhub.neighbourhubbackend.model.Notice;
import com.neighbourhub.neighbourhubbackend.repository.NoticeRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeRepository noticeRepository;

    public NoticeController(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @GetMapping
    public List<Notice> getAllNotices(@RequestParam(required = false) String society) {
        if (society != null) {
            return noticeRepository.findBySociety(society);
        }
        return noticeRepository.findAll();
    }

    @PostMapping
    public Notice addNotice(@RequestBody Notice newNotice) {
        return noticeRepository.save(newNotice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotice(@PathVariable Integer id, @RequestBody Notice updatedNotice) {

        Optional<Notice> existing = noticeRepository.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.status(404).body("Notice not found");
        }

        Notice notice = existing.get();
        notice.setTitle(updatedNotice.getTitle());
        notice.setCategory(updatedNotice.getCategory());
        notice.setDescription(updatedNotice.getDescription());
        notice.setDate(updatedNotice.getDate());
        notice.setPostedBy(updatedNotice.getPostedBy());
        notice.setSociety(updatedNotice.getSociety());

        noticeRepository.save(notice);

        return ResponseEntity.ok(notice);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Integer id) {

        if (!noticeRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Notice not found");
        }

        noticeRepository.deleteById(id);

        return ResponseEntity.ok("Deleted successfully");
    }
}