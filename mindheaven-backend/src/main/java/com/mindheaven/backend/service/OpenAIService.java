package com.mindheaven.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${openai.api.url}")
    private String openAiApiUrl;

    @Value("${openai.api.key}")
    private String openAiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("unchecked")
    public String getAIResponse(String userInput) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(
            Map.of("role", "system", "content", "You are a helpful assistant."),
            Map.of("role", "user", "content", "Analyze the user's mood based on the following text. Provide supportive advice, solutions for improving mental health, and possible recommendations for professional help. The input text is: " + userInput)
        ));
        requestBody.put("max_tokens", 300); // Increase token count for longer responses
        requestBody.put("temperature", 0.7); // Make the responses more human-like

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        // Debug statement to print the URL
        System.out.println("Request URL: " + openAiApiUrl + "/v1/chat/completions");

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
            openAiApiUrl + "/v1/chat/completions",
            HttpMethod.POST,
            request,
            new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("choices")) {
            List<Object> choices = (List<Object>) responseBody.get("choices");
            Map<String, Object> choice = (Map<String, Object>) choices.get(0);
            Map<String, Object> message = (Map<String, Object>) choice.get("message");
            return (String) message.get("content");
        }
        return "Error processing chat message.";
    }
}
