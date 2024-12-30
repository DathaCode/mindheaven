package com.mindheaven.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.mindheaven.backend")
public class MindheavenBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(MindheavenBackendApplication.class, args);
    }
}
