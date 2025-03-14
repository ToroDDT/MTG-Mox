package com.example.MTG_Mox.repo;

import com.example.MTG_Mox.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<User, String> {

        Optional <User> findByUsername(String username);
}
