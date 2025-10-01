package com.example.MTG_Mox.service;

import org.springframework.stereotype.Service;

import com.example.MTG_Mox.repo.CardRepository;

@Service
public class CardService {

  private final CardRepository cardRepository;

  public CardService(CardRepository cardRepository) {
    this.cardRepository = cardRepository;
  }
}
