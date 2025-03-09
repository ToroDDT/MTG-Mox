package com.example.MTG_Mox.service;

import com.example.MTG_Mox.model.Account;
import com.example.MTG_Mox.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    private AccountRepo accountRepo;

    public List<Account> getAllAccounts(AccountRepo accountRepo){
        List<Account> accounts = new ArrayList<>();
        accountRepo.findAll().forEach(accounts::add);
        return accounts;
    }

    public Optional<Account> getAccount(String id ) {return accountRepo.findById(id);}


    public void addAccount(Account account){ accountRepo.save(account);}


    public void updateAccount(String id, Account account){accountRepo.save(account);}


    public void deleteAccount(String id){accountRepo.deleteById(id);}

}
