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
    public User( String username, String password, Set<Role> roles) {

        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public User(String username, String password){
        this.username = username;
        this.password = password;
    }


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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    @Id
    private String username;
    private String password;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Role> roles;
    public User(){

    }

}

