package com.example.MTG_Mox.model;

import com.example.MTG_Mox.auth.TokenGenerator;
import com.example.MTG_Mox.auth.TokenGeneratorUUID;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import java.util.Date;
@Entity
public class PasswordResetToken {
    @Id
    private String email;
    private String token;
    private LocalDateTime expirationDate;

    public PasswordResetToken(){

    }
    public PasswordResetToken(String email) {
        TokenGenerator tokenGenerator = new TokenGeneratorUUID();
        tokenGenerator.createToken();
        this.token = tokenGenerator.createToken();
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
