package com.example.MTG_Mox.api;

import java.util.List;

import com.example.MTG_Mox.advice.CardDoesNotExistException;
import com.example.MTG_Mox.advice.InvalidCommanderCardException;
import com.example.MTG_Mox.model.Search;
import com.example.MTG_Mox.model.TCG.MagicCard;

import java.io.IOException;

public interface ScryFallApiClient {

    public List<String> searchCard(String card) throws IOException, InterruptedException, CardDoesNotExistException;

    public Boolean addCardToCommanderDeck(String card, String commander)
            throws IOException, InterruptedException, InvalidCommanderCardException;

    public List<MagicCard> advanceSearch(Search searchParameters) throws IOException, InterruptedException;
}
