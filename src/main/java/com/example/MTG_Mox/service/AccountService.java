package com.example.MTG_Mox.service;

import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.repo.AccountRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    private AccountRepo accountRepo;

    public List<User> getAllAccounts(AccountRepo accountRepo){
        List<User> users = new ArrayList<>();
        accountRepo.findAll().forEach(users::add);
        return users;
    }

    public void addAccount(User user){ accountRepo.save(user);}


    public void updateAccount(String id, User user){accountRepo.save(user);}


    public void deleteAccount(String id){accountRepo.deleteById(id);}

}
