package com.example.MTG_Mox.model;

import com.example.MTG_Mox.validate.AccountConstraint;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.stereotype.Component;

import java.util.Date;

@Entity
@Component
@AccountConstraint
public class Account {
    @Id
    private String Email;
    private String password;
    private String token = "";

    private Date expirationDate;
    Account(String email, String password){
        this.Email = email;
        this.password = password;
    }
    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public Date getExpirationDate() {
        return expirationDate;
    }
    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

}
