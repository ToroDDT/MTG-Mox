package com.example.MTG_Mox.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.MTG_Mox.model.TCG.MagicCard;

@Repository
public interface CardRepository extends JpaRepository<MagicCard, Long> {

  @Modifying
  @Query("DELETE From MagicCard c where c.id = :id")
  @Transactional
  void deleteByCardID(@Param("id") String id);

  Optional<MagicCard> findByName(String name);

}
