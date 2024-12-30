package com.mindheaven.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.mindheaven.backend")
public class MindheavenBackendApplication {
    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure()
                              .directory("C:\\MINDAPP\\MindHeaven")
                              .load(); // Load environment variables

        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("OPENAI_API_KEY", dotenv.get("OPENAI_API_KEY"));
        System.setProperty("FIREBASE_SERVICE_ACCOUNT_JSON", dotenv.get("FIREBASE_SERVICE_ACCOUNT_JSON"));

        SpringApplication.run(MindheavenBackendApplication.class, args);
    }
}