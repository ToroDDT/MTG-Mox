package com.example.MTG_Mox.repo;

import com.example.MTG_Mox.model.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepo extends CrudRepository<Account, String> {

}
