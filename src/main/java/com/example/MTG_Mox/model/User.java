package com.example.MTG_Mox.model;

import com.example.MTG_Mox.validate.AccountConstraint;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Set;

@Entity
@AccountConstraint
@Component
@Table(name = "account_user")
public class User {
    @Id
    private  long id;
    private String username;
    private String password;
    private String token;
    private Date expirationDate;
    @ManyToMany
    private Set<Role> roles;
    public User(){

    }

    public User(long id, String username, String password, String token, Date expirationDate, Set<Role> roles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.token = token;
        this.expirationDate = expirationDate;
        this.roles = roles;
    }



    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
    public Set<Role> getRoles() {
        return roles;  // Return the roles associated with the user
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}

