package com.example.MTG_Mox.Cache;

import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SearchCache {
  // key -> list of string values (e.g. card names, search results, etc.)
  private final Map<String, List<String>> data = new ConcurrentHashMap<>();

  /**
   * Put the list only if absent. Returns the previous value or null if inserted.
   */
  public List<String> putIfAbsent(String key, List<String> cards) {
    return data.putIfAbsent(key, cards);
  }

  /** Forcefully put/replace the list. Returns the previous value. */
  public List<String> put(String key, List<String> cards) {
    return data.put(key, cards);
  }

  /** Get the list by key (may return null). */
  public List<String> get(String key) {
    return data.get(key);
  }

  /** Remove a list from the cache and return it. */
  public List<String> removeAndReturn(String key) {
    return data.remove(key);
  }

  /** Check if a key exists in the cache. */
  public boolean contains(String key) {
    return data.containsKey(key);
  }

  /** Clear all cached entries. */
  public void clear() {
    data.clear();
  }

  /** Return the size of the cache. */
  public int size() {
    return data.size();
  }
}
