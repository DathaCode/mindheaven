package com.mindheaven.backend.controllers;

import com.mindheaven.backend.service.OpenAIService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the frontend
public class ChatController {

    private final OpenAIService openAIService;

    public ChatController(OpenAIService openAIService) {
        this.openAIService = openAIService;
    }

    @PostMapping("/message")
    public ResponseEntity<?> handleMessage(@RequestBody Map<String, String> input) {
        String userText = input.get("text");

        try {
            String responseText = openAIService.getAIResponse(userText);
            Map<String, Object> response = new HashMap<>();
            response.put("response", responseText);
            response.put("message", "Chat message processed successfully.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing chat message: " + e.getMessage());
        }
    }
}