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
    @Autowired
    public List<Account> getAllAccounts(AccountRepo accountRepo){
        List<Account> accounts = new ArrayList<>();
        accountRepo.findAll().forEach(accounts::add);
        return accounts;
    }
    @Autowired
    public Optional<Account> getAccount(String id, AccountRepo accountRepo ) {return accountRepo.findById(id);}

    @Autowired
    public void addAccount(Account account, AccountRepo accountRepo){ accountRepo.save(account);}

    @Autowired
    public void updateAccount(String id, Account account, AccountRepo accountRepo){accountRepo.save(account);}

    @Autowired
    public void deleteAccount(String id, AccountRepo accountRepo){accountRepo.deleteById(id);}



}
