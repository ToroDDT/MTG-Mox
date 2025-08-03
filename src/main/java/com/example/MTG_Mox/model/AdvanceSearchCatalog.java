package com.example.MTG_Mox.model;

import java.util.*;

import com.example.MTG_Mox.model.TCG.MagicCard;

public class AdvanceSearchCatalog {
    private String object;

    private int totalCards;

    private boolean hasMore;

    private String nextPage;

    private List<MagicCard> data;

    // Getters and setters

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public int getTotalCards() {
        return totalCards;
    }

    public void setTotalCards(int totalCards) {
        this.totalCards = totalCards;
    }

    public boolean isHasMore() {
        return hasMore;
    }

    public void setHasMore(boolean hasMore) {
        this.hasMore = hasMore;
    }

    public String getNextPage() {
        return nextPage;
    }

    public void setNextPage(String nextPage) {
        this.nextPage = nextPage;
    }

    public List<MagicCard> getData() {
        return data;
    }

    public void setData(List<MagicCard> data) {
        this.data = data;
    }

}
