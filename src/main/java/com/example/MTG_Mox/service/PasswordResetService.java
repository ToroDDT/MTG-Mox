package com.example.MTG_Mox.service;

import com.example.MTG_Mox.Email.EmailSender;
import com.example.MTG_Mox.advice.EmailDoesNotExistException;
import com.example.MTG_Mox.model.PasswordResetToken;
import com.example.MTG_Mox.repo.PasswordResetRepository;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.io.UnsupportedEncodingException;
import java.util.Objects;
import java.util.Optional;

@Service
public class PasswordResetService {
    private final EmailSender emailSender;
    private final PasswordResetRepository passwordResetRepository;
    private final AccountService accountService;

    // Constructor-based Dependency Injection (Best Practice)
    public PasswordResetService(EmailSender emailSender,
                                PasswordResetRepository passwordResetRepository,
                                AccountService accountService) {
        this.emailSender = emailSender;
        this.passwordResetRepository = passwordResetRepository;
        this.accountService = accountService;
    }

    private void sendRecoveryEmail(String recipientEmail, String subject, String content)
            throws MessagingException, UnsupportedEncodingException {
        emailSender.sendEmail(recipientEmail, subject, content);
    }

    public boolean checkIfTokenExistsAndPresent(String email, String tokenFromUrl) {
        return passwordResetRepository.findById(email)
                .map(token -> {
                    LocalDateTime currentTime = LocalDateTime.now();
                    boolean tokenIsExpired = currentTime.isAfter(token.getExpirationDate().plusMinutes(10));
                    boolean tokenIsValid = Objects.equals(token.getToken(), tokenFromUrl);
                    return !tokenIsExpired && tokenIsValid;
                })
                .orElse(false); // If the token isn't found, return false
    }

    private String addTokenToEmailURL(PasswordResetToken token, String email) {
        return "http://localhost:8080/reset-password?token=" + token.getToken() + "&email=" + email;
    }

    public boolean addTokenToDatabase(String email) throws MessagingException, UnsupportedEncodingException, EmailDoesNotExistException{
        boolean emailExists = true;
        if (accountService.findUser(email).isEmpty()) {
            emailExists = false;
            throw new EmailDoesNotExistException("Email was  not found");
        }

        PasswordResetToken passwordResetToken = new PasswordResetToken(email);
        passwordResetRepository.save(passwordResetToken); // Save token first

        String recoveryEmail = addTokenToEmailURL(passwordResetToken, email);
        String emailContent = "<p>Your Recovery link:</p> <a href=\"" + recoveryEmail + "\">Reset Password</a>";

        sendRecoveryEmail(email, "Link to Reset your Password", emailContent);
        return true;
    }
}

