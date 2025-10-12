package com.example.MTG_Mox.Cache;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.example.MTG_Mox.model.TCG.MagicCard;

@Component
public class CardCache {
  // key -> MagicCard (use a stable key, e.g. card name + set code if needed)
  private final Map<String, MagicCard> data = new ConcurrentHashMap<>();

  /**
   * Put the card only if absent. Returns the previous value or null if inserted.
   */
  public MagicCard putIfAbsent(String key, MagicCard card) {
    return data.putIfAbsent(key, card);
  }

  /** Forcefully put/replace the card. Returns previous value. */
  public MagicCard put(String key, MagicCard card) {
    return data.put(key, card);
  }

  /** Get a card by key (may return null). */
  public MagicCard get(String key) {
    return data.get(key);
  }

  /** Remove a card from the cache and return it. */
  public MagicCard remove(String key) {
    return data.remove(key);
  }

  /** Check existence. */
  public boolean contains(String key) {
    return data.containsKey(key);
  }
}
