package com.example.MTG_Mox.service;

import com.example.MTG_Mox.auth.MyUserPrincipal;
import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.repo.AccountRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    public JpaUserDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional <User> userOptional = accountRepository.findByUsername(username);
        if(userOptional.isEmpty()){
            System.out.println("user not found");
            throw new UsernameNotFoundException("User not found with username"+username);

        }
        User user = userOptional.get();
        return new MyUserPrincipal(user);
    }
}
