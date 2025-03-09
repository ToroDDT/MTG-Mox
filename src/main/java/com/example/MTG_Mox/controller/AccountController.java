package com.example.MTG_Mox.controller;

import com.example.MTG_Mox.model.Account;
import com.example.MTG_Mox.repo.AccountRepo;
import com.example.MTG_Mox.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

public class AccountController {
    @GetMapping("/login")
    public String showLogin(){
        return "login";
    }
    @PostMapping("/create-account")
    @Autowired
    public ResponseEntity<?> submitForm(@RequestBody @Valid Account account, BindingResult result, Model model, AccountService accountService){
        // code to add form data to database
        if(result.hasErrors()){
            Map<String, String> errors = new HashMap<>();
            for(FieldError fieldError : result.getFieldErrors()){
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errors);
        }
        accountService.addAccount(account);
        return ResponseEntity.ok(result);
    }
}
