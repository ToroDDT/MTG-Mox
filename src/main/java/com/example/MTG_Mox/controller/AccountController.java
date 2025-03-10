package com.example.MTG_Mox.controller;

import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class AccountController {

    @Autowired
    AccountService accountService;
    @GetMapping("/home")
    public String showHome(){
        return "home";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @PostMapping("/create-account")
    public ResponseEntity<?> submitForm( @RequestBody @Valid User user, BindingResult result){
        // code to add form data to database
        if(result.hasErrors()){
            Map<String, String> errors = new HashMap<>();
            for(FieldError fieldError : result.getFieldErrors()){
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errors);
        }
        accountService.addAccount(user);
        return ResponseEntity.ok(result);
    }
}
