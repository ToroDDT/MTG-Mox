package com.example.MTG_Mox.api;

import java.io.IOException;

public interface ScryFallApiClient {
    public String searchCard(String card) throws IOException, InterruptedException;
}
