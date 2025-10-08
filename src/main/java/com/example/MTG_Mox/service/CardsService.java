package com.example.MTG_Mox.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.MTG_Mox.model.TCG.MagicCard;
import com.example.MTG_Mox.repo.CardRepository;

public class CardsService {

  private final CardRepository cardRepository;

  @Autowired
  public CardsService(CardRepository cardRepository) {
    this.cardRepository = cardRepository;
  }

  public void deleteCardFromDeck(String name) {

    MagicCard card = cardRepository.findByName(name).orElseThrow(() -> new RuntimeException("Card does not exist"));

    card.setTotal(card.getTotal() - 1);

    if (card.getTotal() == 0) {
      cardRepository.deleteByCardID(card.getId());
    } else {
      cardRepository.save(card);
    }
  }
}
