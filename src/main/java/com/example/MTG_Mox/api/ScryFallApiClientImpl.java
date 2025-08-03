package com.example.MTG_Mox.api;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties.Io;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.example.MTG_Mox.model.AdvanceSearchCatalog;
import com.example.MTG_Mox.model.Catalog;
import com.example.MTG_Mox.model.Search;
import com.example.MTG_Mox.model.TCG.MagicCard;
import com.example.MTG_Mox.service.CommanderService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ScryFallApiClientImpl implements ScryFallApiClient {
    private final CommanderService commanderService;

    @Autowired
    public ScryFallApiClientImpl(CommanderService commanderService) {
        this.commanderService = commanderService;
    }

    private Boolean checkStringForPlusSign(StringBuilder stringBuilder) {
        // check if string is empty, if the string is empty do not append a plus sign

        Pattern pattern = Pattern.compile("+", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(stringBuilder.toString());
        boolean matchFound = matcher.find();
        if (matchFound && stringBuilder.toString().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    private Boolean checkIfStringIsEmpty(StringBuilder stringBuilder) {
        if (stringBuilder.isEmpty()) {
            return true;
        } else
            return false;
    }

    @Override
    public List<String> searchCard(String card) throws IOException, InterruptedException {
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
    public Boolean addCardToCommanderDeck(String card, String commander) throws IOException, InterruptedException {
        Boolean addedCommander = false;
        // 1. Create an HttpClient
        HttpClient client = HttpClient.newHttpClient();

        // 2. Build an HttpRequest
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.scryfall.com/cards/named?exact=" + card))
                .GET()
                .header("Accept", "application/json")
                .header("User-Agent", "MTG-MOX-APP")
                .build();
        // 3. Send the request and return the response body
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        ObjectMapper objectMapper = new ObjectMapper();
        MagicCard listOfCards = objectMapper.readValue(response.body(), MagicCard.class);
        return true;
    }

    @Override
    public List<MagicCard> advanceSearch(Search searchParameter) throws IOException, InterruptedException {

        // Url builder
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromUriString("https://api.scryfall.com/cards/search");
        StringBuilder stringBuilder = new StringBuilder("");

        if (searchParameter.getPower() != null && searchParameter.getRelativePower() != null) {
            if (!checkIfStringIsEmpty(stringBuilder))
                stringBuilder.append("+");

            switch (searchParameter.getRelativePower()) {
                case "Greater than" -> stringBuilder.append("pow>").append(searchParameter.getPower());
                case "Equal to" -> stringBuilder.append("pow=").append(searchParameter.getPower());
                case "Less than" -> stringBuilder.append("pow<").append(searchParameter.getPower());
            }
        }

        if (searchParameter.getToughness() != null && searchParameter.getRelativeToughness() != null) {
            if (!checkIfStringIsEmpty(stringBuilder))
                stringBuilder.append("+");

            switch (searchParameter.getRelativeToughness()) {
                case "Greater than" -> stringBuilder.append("tou>").append(searchParameter.getToughness());
                case "Equal to" -> stringBuilder.append("tou=").append(searchParameter.getToughness());
                case "Less than" -> stringBuilder.append("tou<").append(searchParameter.getToughness());
            }
        }

        if (searchParameter.getSet() != null && !searchParameter.getSet().isEmpty()) {
            if (!checkIfStringIsEmpty(stringBuilder))
                stringBuilder.append("+");
            stringBuilder.append("set:").append(searchParameter.getSet());
        }

        if (searchParameter.getName() != null && !searchParameter.getName().isEmpty()) {
            if (!checkIfStringIsEmpty(stringBuilder))
                stringBuilder.append("+");
            stringBuilder.append("name://").append(searchParameter.getName()).append("/");
        }

        if (searchParameter.getCard_type() != null && !searchParameter.getCard_type().isEmpty()) {
            if (!checkIfStringIsEmpty(stringBuilder))
                stringBuilder.append("+");
            stringBuilder.append("t:").append(searchParameter.getCard_type());
        }

        if (searchParameter.getColors_identity() != null && !searchParameter.getColors_identity().isEmpty()) {
            if (!checkIfStringIsEmpty(stringBuilder))
                stringBuilder.append("+");
            stringBuilder.append("id:").append(searchParameter.getColors_identity());
        }
        String finalUrl = urlBuilder.queryParam("q", stringBuilder.toString()).toUriString();

        HttpClient client = HttpClient.newHttpClient();

        // 2. Build an HttpRequest
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(finalUrl))
                .GET()
                .header("Accept", "application/json")
                .header("User-Agent", "MTG-MOX-APP")
                .build();
        // 3. Send the request and return the response body
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        ObjectMapper objectMapper = new ObjectMapper();
        AdvanceSearchCatalog listOfCards = objectMapper.readValue(response.body(), AdvanceSearchCatalog.class);

        return listOfCards.getData();

    }
}
