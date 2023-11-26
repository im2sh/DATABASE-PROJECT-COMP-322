package com.comp322team12.together.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
    @GetMapping("/api/hello")
    public String test() {
        return "Hello, World!";
    }
}
