package com.example.MTG_Mox.controller;

import com.example.MTG_Mox.advice.UserAlreadyExistsException;
import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
public class AccountController {

    @Autowired
    AccountService accountService;
    @GetMapping("/")
    public String index(){
        return "home";
    }
    @GetMapping("/home")
    public String showHome(){
        return "home";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @PostMapping("/create-account")
    public ResponseEntity<?> submitForm( @RequestBody @Valid User user, BindingResult result) {
        accountService.addUser(user);
        return ResponseEntity.ok(user);
    }
}
