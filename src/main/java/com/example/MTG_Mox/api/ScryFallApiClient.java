package com.example.MTG_Mox.api;

import java.util.List;

import com.example.MTG_Mox.model.Search;

import java.io.IOException;

public interface ScryFallApiClient {
    public List<String> searchCard(String card) throws IOException, InterruptedException;

    public Boolean addCardToCommanderDeck(String card, String commander) throws IOException, InterruptedException;

    public List<String> advanceSearch(Search searchParameters) throws IOException, InterruptedException;
}
