package com.example.MTG_Mox.auth;

import com.example.MTG_Mox.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;


public class MyUserPrincipal implements UserDetails {
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    private com.example.MTG_Mox.model.User user;

    public MyUserPrincipal(com.example.MTG_Mox.model.User user) {
        this.user = user;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Assuming user.getRoles() returns a collection of roles; map them to SimpleGrantedAuthority
        return user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))  // Adjust this based on your role structure
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return user.getPassword();  // Return the password from the User entity
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

}
