package com.example.MTG_Mox.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MTG_Mox.model.TCG.MagicCard;

@Repository
public interface CardRepository extends JpaRepository<MagicCard, Long> {

}
