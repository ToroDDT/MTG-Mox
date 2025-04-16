package com.example.MTG_Mox.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MTG_Mox.model.TCG.Commander;

public interface CommanderRepository extends JpaRepository<Commander, Long> {
        Optional<Commander> findByName(String name);
}
