package com.example.MTG_Mox.repo;

import com.example.MTG_Mox.model.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<User, String> {

        Optional <User> findByUsername(String username);
}
