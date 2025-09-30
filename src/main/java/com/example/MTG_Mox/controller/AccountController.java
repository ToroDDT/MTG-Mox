package com.example.MTG_Mox.controller;

import com.example.MTG_Mox.MagicCardWrapper;
import com.example.MTG_Mox.advice.CardDoesNotExistException;
import com.example.MTG_Mox.advice.EmailDoesNotExistException;
import com.example.MTG_Mox.advice.ErrorDetails;
import com.example.MTG_Mox.advice.InvalidCommanderCardException;
import com.example.MTG_Mox.api.ScryFallApiClientImpl;
import com.example.MTG_Mox.dto.MagicCardDto;
import com.example.MTG_Mox.model.Search;
import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.model.TCG.Commander;
import com.example.MTG_Mox.model.TCG.MagicCard;
import com.example.MTG_Mox.service.AccountService;
import com.example.MTG_Mox.service.CommanderService;
import com.example.MTG_Mox.service.PasswordResetService;
import com.example.MTG_Mox.validate.EmailValidatorJavaImpl;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;

@Controller
public class AccountController {

  private final MagicCardWrapper magicCardWrapper;
  private final PasswordResetService passwordResetService;
  private final ScryFallApiClientImpl scryFallApiClientImpl;
  private final EmailValidatorJavaImpl emailValidatorJavaImpl;
  private final CommanderService commanderService;
  private final AccountService accountService;

  @Autowired
  public AccountController(PasswordResetService passwordResetService, ScryFallApiClientImpl scryFallApiClientImpl,
      CommanderService commanderService, MagicCardWrapper magicCardWrapper,
      AccountService accountService, EmailValidatorJavaImpl emailValidatorJavaImpl) {
    this.passwordResetService = passwordResetService;
    this.scryFallApiClientImpl = scryFallApiClientImpl;
    this.commanderService = commanderService;
    this.magicCardWrapper = magicCardWrapper;
    this.accountService = accountService;
    this.emailValidatorJavaImpl = emailValidatorJavaImpl;
  }

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

    boolean emailIsCorrect = emailValidatorJavaImpl.validateEmail(email);

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
  public ResponseEntity<?> showAutocommplete(@RequestParam("card") String card)
      throws UnsupportedEncodingException {
    List<String> cardList = new ArrayList<>();
    String encodedValue = URLEncoder.encode(card, StandardCharsets.UTF_8.toString());
    try {
      cardList = scryFallApiClientImpl.searchCard(encodedValue);
    } catch (CardDoesNotExistException e) {
      ErrorDetails errorDetails = new ErrorDetails();
      errorDetails.setMessage("Card does not exist in scryfall api...");
      return ResponseEntity
          .badRequest()
          .body(errorDetails);

    } catch (InterruptedException | IOException | UnsupportedOperationException exception) {
      exception.printStackTrace();
    }
    Map<String, List<String>> responseData = new HashMap<>();
    responseData.put("data", cardList);
    return new ResponseEntity<>(responseData, HttpStatus.OK);
  }

  @PostMapping("/addCardToCommmaderDeck")
  @Transactional
  public ResponseEntity<?> addCardToCommander(@RequestBody String card) {
    try {
      scryFallApiClientImpl.addCardToCommanderDeck(card);

    } catch (IOException | InterruptedException e) {

      e.printStackTrace();

    } catch (InvalidCommanderCardException exception) {
      ErrorDetails errorDetails = new ErrorDetails();
      errorDetails.setMessage("Commander or Card fields are empty...");
      return ResponseEntity.badRequest().body(errorDetails);
    }
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/user")
  public ResponseEntity<?> getProfile(Principal principal) {
    var userName = principal.getName();
    String currentCommander = "";
    try {
      currentCommander = commanderService.getCurrentCommander();
    } catch (Exception e) {
      e.printStackTrace();
    }
    Map<String, String> responseData = new HashMap<>();
    responseData.put("userName", userName);
    responseData.put("commander", currentCommander);

    return new ResponseEntity<>(responseData, HttpStatus.OK);
  }

  @PostMapping("/advance-search")
  public ResponseEntity<?> advanceSearchScryFallApi(@RequestBody Search search) {
    // Create a List for cards
    List<MagicCard> listOfCards = new ArrayList<>();
    try {
      listOfCards = scryFallApiClientImpl.advanceSearch(search);
    } catch (Exception e) {
      e.printStackTrace();
    }
    Map<String, List<MagicCard>> responseData = new HashMap<>();
    responseData.put("data", listOfCards);
    return new ResponseEntity<>(responseData, HttpStatus.OK);
  }

  // Get Commander Deck that is current and its cards

  @GetMapping("/commander-deck")
  public ResponseEntity<?> getCurrentCommanderDeck() {
    Optional<Commander> commander = commanderService.getCurrentCommanderDeck();
    List<MagicCard> listOfCards = commander.get().getMagicCards();
    Map<String, List<MagicCard>> responseData = new HashMap<>();
    List<MagicCardDto> listOfCardDtos = magicCardWrapper
        .toDtoList(commander.get().getMagicCards());
    responseData.put("data", listOfCards);
    return new ResponseEntity<>(responseData, HttpStatus.OK);
  }

}
