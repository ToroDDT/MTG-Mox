package com.example.MTG_Mox.controller;

import com.example.MTG_Mox.advice.EmailDoesNotExistException;
import com.example.MTG_Mox.advice.UserAlreadyExistsException;
import com.example.MTG_Mox.api.ScryFallApiClient;
import com.example.MTG_Mox.api.ScryFallApiClientImpl;
import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.service.AccountService;
import com.example.MTG_Mox.service.PasswordResetService;
import com.example.MTG_Mox.validate.EmailValidatorJavaImpl;
import com.example.MTG_Mox.validate.EmailValidators;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException.BadRequest;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;

@Controller
public class AccountController {
    private final PasswordResetService passwordResetService;
    private final ScryFallApiClientImpl scryFallApiClientImpl;

    @Autowired
    public AccountController(PasswordResetService passwordResetService, ScryFallApiClientImpl scryFallApiClientImpl) {
        this.passwordResetService = passwordResetService;
        this.scryFallApiClientImpl = scryFallApiClientImpl;
    }

    @Autowired
    AccountService accountService;

    @GetMapping("/home")
    public String showHome() {
        return "home";
    }

    @GetMapping(value = "/**/{path:[^\\.]*}")
    public String forward() {
        return "forward:/";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/create-account")
    public ResponseEntity<?> submitForm(@RequestBody @Valid User user, BindingResult result) {
        accountService.addUser(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/forgot-password")
    public String resetPasswordForm() {
        return "email-form";
    }

    @PostMapping("/forgot-password")
    public String sendEmailLinkToResetPassword(@RequestParam("email") String email, Model model)
            throws MessagingException, UnsupportedEncodingException, EmailDoesNotExistException {
        EmailValidators emailValidator = new EmailValidatorJavaImpl(); // Consider injecting this via @Service
        boolean emailIsCorrect = emailValidator.validateEmail(email);

        if (!emailIsCorrect) {
            model.addAttribute("errorMessage", "Invalid email format. Please enter a valid email.");
            return "email-form"; // Return the form with an error message
        }
        try {
            boolean createdTokenSuccessfully = passwordResetService.addTokenToDatabase(email);
        } catch (Exception e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "email-form";
        }
        model.addAttribute("successMessage", "A password reset link has been sent to your email.");
        return "email-form"; // Show the form with success message
    }

    // EndPoints for React App
    @GetMapping("/autocomplete")
    public ResponseEntity<?> showAutocommplete(@RequestParam("card") String card) {
        List<String> cardList = new ArrayList<>();
        try {
            cardList = scryFallApiClientImpl.searchCard(card);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        Map<String, List<String>> responseData = new HashMap<>();
        responseData.put("data", cardList);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("/addCardToCommmaderDeck")
    public ResponseEntity<?> addCardToCommander(@RequestParam("card") String card,
            @RequestParam("commander") String commander) {
        try {
            scryFallApiClientImpl.addCardToCommanderDeck(card, commander);
        } catch (Exception e) {
            // TODO: handle exception
            //
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
