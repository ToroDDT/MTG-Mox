package com.example.MTG_Mox.service;

import com.example.MTG_Mox.advice.UserAlreadyExistsException;
import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.repo.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public List<User> getAllAccounts(AccountRepository accountRepository){
        List<User> users = new ArrayList<>();
        accountRepository.findAll().forEach(users::add);
        return users;
    }


   public Optional<User> findUser(String username) {
        return accountRepository.findById(username);
   }

   public void addUser(User user){
        var existUser = accountRepository.findById(user.getUsername()).orElse(null);
        if (existUser != null){
            throw new UserAlreadyExistsException("Username already exists");
        }
        accountRepository.save(user);
   }

    public void updateAccount(String id, User user){
        accountRepository.save(user);}


    //public void deleteAccount(Long id){accountRepo.deleteById(id);}

}
