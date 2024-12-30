package com.mindheaven.backend;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseConfig.class);

    @Value("${firebase.database.url}")
    private String databaseUrl;

    @Value("${firebase.service.account.key}")
    private String serviceAccountKey;

    @PostConstruct
    public void initFirebase() {
        try {
            // Load service account JSON from classpath
            InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream(serviceAccountKey.replace("classpath:", ""));
            if (serviceAccount == null) {
                throw new IOException("Service account file not found in classpath!");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(databaseUrl)
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                logger.info("Firebase initialized successfully!");
            } else {
                logger.info("Firebase already initialized.");
            }

        } catch (IOException e) {
            logger.error("Firebase initialization failed: {}", e.getMessage(), e);
        }
    }
}
