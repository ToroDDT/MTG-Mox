package com.example.MTG_Mox.api;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ScryFallApiClientImpl implements ScryFallApiClient {

    @Override
    public String searchCard(String card) throws IOException, InterruptedException {

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
        return response.body();
    }
}
