package com.example.MTG_Mox.service;

import com.example.MTG_Mox.auth.MyUserPrincipal;
import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class MyAccountDetailsService implements UserDetailsService {
    @Autowired
    AccountRepo accountRepo;

    @Override
    public UserDetails loadUserByUsername(String username){
        Optional <User> userOptional = accountRepo.findByUsername(username);
        if(userOptional.isEmpty()){
            throw new UsernameNotFoundException("User not found with username"+username);
        }
        User user = userOptional.get();
        return new MyUserPrincipal(user);
    }
}
