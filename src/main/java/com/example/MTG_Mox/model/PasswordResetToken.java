package com.example.MTG_Mox.model;

import java.time.LocalDateTime;
import java.util.Date;

public class PasswordResetToken {
    private String email;
    private String token;
    private LocalDateTime expirationDate;

    public PasswordResetToken(){

    }
    public PasswordResetToken(String token, String email) {
        this.token = token;
        this.expirationDate = LocalDateTime.now();
        this.email = email;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }
}
