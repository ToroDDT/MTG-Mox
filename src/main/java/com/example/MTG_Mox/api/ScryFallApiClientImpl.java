package com.example.MTG_Mox.api;

import java.util.List;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import com.example.MTG_Mox.advice.CardDoesNotExistException;
import com.example.MTG_Mox.advice.InvalidCommanderCardException;
import com.example.MTG_Mox.model.AdvanceSearchCatalog;
import com.example.MTG_Mox.model.Catalog;
import com.example.MTG_Mox.model.Search;
import com.example.MTG_Mox.model.TCG.Commander;
import com.example.MTG_Mox.model.TCG.MagicCard;
import com.example.MTG_Mox.service.CardsService;
import com.example.MTG_Mox.service.CommanderService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;

@Component
public class ScryFallApiClientImpl implements ScryFallApiClient {

  private final CommanderService commanderService;
  private final CardsService cardsService;

  @Autowired
  public ScryFallApiClientImpl(CommanderService commanderService, CardsService cardsService) {
    this.commanderService = commanderService;
    this.cardsService = cardsService;
  }

  @Override
  public List<String> searchCard(String card)
      throws IOException, InterruptedException, CardDoesNotExistException {
    if (card.isEmpty()) {
      throw new CardDoesNotExistException();
    }
    // 1. Create an HttpClient
    HttpClient client = HttpClient.newHttpClient();

    // 2. Build an HttpRequest
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://api.scryfall.com/cards/autocomplete?q=" + card))
        .GET()
        .header("Accept", "application/json")
        .header("User-Agent", "MTG-MOX-APP")
        .build();
    // 3. Send the request and return the response body
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    ObjectMapper objectMapper = new ObjectMapper();
    Catalog listOfCards = objectMapper.readValue(response.body(), Catalog.class);
    // 4. check if the array is empty if the array is empty return an empty string
    return listOfCards.getData();
  }

  @Override
  @Transactional
  public void addCardToCommanderDeck(String card)
      throws IOException, InterruptedException, InvalidCommanderCardException {
    if (card.isEmpty()) {
      throw new InvalidCommanderCardException();
    }
    String cardName = card;
    String encodedName = URLEncoder.encode(cardName, StandardCharsets.UTF_8.toString());
    // 1. Create an HttpClient
    HttpClient client = HttpClient.newHttpClient();

    // 2. Build an HttpRequest
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://api.scryfall.com/cards/named?exact=" + encodedName))
        .GET()
        .header("Accept", "application/json")
        .header("User-Agent", "MTG-MOX-APP")
        .build();
    // 3. Send the request and return the response body
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    ObjectMapper objectMapper = new ObjectMapper();
    MagicCard magicCard = objectMapper.readValue(response.body(), MagicCard.class);
    Optional<Commander> commander = commanderService.getCurrentCommanderDeck();
    // check if card exist in commmander deck first
    List<MagicCard> magigCards = commander.get().getMagicCards();
    for (MagicCard cardObject : magigCards) {
      if (cardObject.getName() == magicCard.getName()) {
        Integer total = cardObject.getTotal();
        cardObject.setTotal(total + 1);
        cardsService.incrementCardAmount(cardObject);
      } else {
        commander.get().addCard(magicCard);
      }

    }

  }

  @Override
  public List<MagicCard> advanceSearch(Search searchParameter) throws IOException, InterruptedException {

    List<MagicCard> resultOfSearch = new ArrayList<MagicCard>();

    try {
      /**
       * Constructs the base URL and initializes a query builder for the Scryfall
       * search API. Using this instead of manual concatentaion due to it being error
       * prone
       * I have to encode each query parameter
       *
       * <p>
       * The base URL is: {@code https://api.scryfall.com/cards/search}.
       * A {@link UriComponentsBuilder} is used to append query parameters
       * dynamically.
       * A {@link StringBuilder} is initialized to assemble the query string based on
       * the search parameters (like power, toughness, type, etc.) that will be added
       * later.
       * </p>
       *
       * <p>
       * Example output URL after query building:
       * {@code https://api.scryfall.com/cards/search?q=pow>3+set:neo+t:creature}
       * </p>
       */
      List<String> parts = new ArrayList<>();

      if (searchParameter.getPower() != null && searchParameter.getRelativePower() != null) {
        switch (searchParameter.getRelativePower()) {
          case "Greater than" -> parts.add("pow>" + searchParameter.getPower());
          case "Equal to" -> parts.add("pow=" + searchParameter.getPower());
          case "Less than" -> parts.add("pow<" + searchParameter.getPower());
        }
      }

      if (searchParameter.getToughness() != null && searchParameter.getRelativeToughness() != null) {
        switch (searchParameter.getRelativeToughness()) {
          case "Greater than" -> parts.add("tou>" + searchParameter.getToughness());
          case "Equal to" -> parts.add("tou=" + searchParameter.getToughness());
          case "Less than" -> parts.add("tou<" + searchParameter.getToughness());
        }
      }

      if (searchParameter.getSet() != null && !searchParameter.getSet().isEmpty())
        parts.add("set:" + searchParameter.getSet());

      if (searchParameter.getName() != null && !searchParameter.getName().isEmpty())
        parts.add("name:" + searchParameter.getName());

      if (searchParameter.getCard_type() != null && !searchParameter.getCard_type().isEmpty())
        parts.add("t:" + searchParameter.getCard_type());

      if (searchParameter.getColors_identity() != null
          && !searchParameter.getColors_identity().isEmpty())
        parts.add("id:" + searchParameter.getColors_identity());

      // Join with spaces
      String queryString = String.join(" ", parts);
      String finalUrl = UriComponentsBuilder
          .fromUriString("https://api.scryfall.com/cards/search")
          .queryParam("q", queryString)
          .queryParam("order", "cmc")
          .toUriString();
      /**
       * Creates a new HTTP client to send requests.
       *
       * <p>
       * The {@link HttpClient} is a modern, non-blocking HTTP client introduced in
       * Java 11.
       * It supports HTTP/1.1 and HTTP/2 protocols, and is used to send requests and
       * receive responses.
       * </p>
       *
       * Example usage:
       * 
       * <pre>
       * HttpClient client = HttpClient.newHttpClient();
       * </pre>
       */
      HttpClient client = HttpClient.newHttpClient();

      /**
       * Builds an HTTP GET request targeting the specified URL.
       *
       * <p>
       * {@link HttpRequest.Builder} is used to configure and create an immutable HTTP
       * request.
       * The URI is set from the provided string URL. The HTTP method used is GET,
       * which requests data from the server.
       * Additionally, two HTTP headers are added:
       * <ul>
       * <li><b>Accept:</b> Indicates that the client expects the response content in
       * JSON format.</li>
       * <li><b>User-Agent:</b> Identifies the client application making the request
       * (here, "MTG-MOX-APP").</li>
       * </ul>
       * </p>
       *
       * Example usage:
       * 
       * <pre>
       * HttpRequest request = HttpRequest.newBuilder()
       *     .uri(URI.create(finalUrl))
       *     .GET()
       *     .header("Accept", "application/json")
       *     .header("User-Agent", "MTG-MOX-APP")
       *     .build();
       * </pre>
       */
      HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create(finalUrl))
          .GET()
          .header("Accept", "application/json")
          .header("User-Agent", "MTG-MOX-APP")
          .build();

      /**
       * Sends the HTTP request synchronously and receives the response body as a
       * String.
       *
       * <p>
       * The {@link HttpClient#send(HttpRequest, HttpResponse.BodyHandler)} method
       * sends the given request and
       * blocks until the response is received. The response body is handled by
       * {@link HttpResponse.BodyHandlers#ofString()}, which converts the body bytes
       * into a String.
       * </p>
       *
       * <p>
       * This method may throw:
       * <ul>
       * <li>{@link IOException} for network or IO errors</li>
       * <li>{@link InterruptedException} if the operation is interrupted</li>
       * </ul>
       * </p>
       *
       * Example usage:
       * 
       * <pre>
       * HttpResponse&lt;String&gt; response = client.send(request, HttpResponse.BodyHandlers.ofString());
       * </pre>
       */
      HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

      /**
       * Parses the JSON response body into an {@link AdvanceSearchCatalog} Java
       * object.
       *
       * <p>
       * {@link ObjectMapper} from the Jackson library is used for deserialization of
       * JSON content.
       * The {@code readValue} method reads the JSON string from the HTTP response
       * body and converts it into
       * an instance of {@code AdvanceSearchCatalog}, based on the class definition
       * and annotations.
       * </p>
       *
       * <p>
       * This allows the application to work with typed Java objects instead of raw
       * JSON strings.
       * </p>
       *
       * Example usage:
       * 
       * <pre>
       * ObjectMapper objectMapper = new ObjectMapper();
       * AdvanceSearchCatalog catalog = objectMapper.readValue(response.body(),
       *     AdvanceSearchCatalog.class);
       * </pre>
       */
      ObjectMapper objectMapper = new ObjectMapper();
      AdvanceSearchCatalog catalog = objectMapper.readValue(response.body(),
          AdvanceSearchCatalog.class);

      return resultOfSearch = catalog.getData();

    } catch (IllegalArgumentException e) {
      System.err.println("Invalid URI: " + e.getMessage());
    } catch (IOException e) {
      System.err.println("I/O error during HTTP or JSON parsing: " + e.getMessage());
    } catch (InterruptedException e) {
      System.err.println("Request interrupted: " + e.getMessage());
      Thread.currentThread().interrupt(); // re-interrupt current thread
    } catch (Exception e) {
      System.err.println("Unexpected error: " + e.getMessage());
      e.printStackTrace();
    }
    return resultOfSearch;
  }
}
