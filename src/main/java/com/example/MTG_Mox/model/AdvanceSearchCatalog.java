package com.example.MTG_Mox.model;

import com.example.MTG_Mox.model.*;
import com.example.MTG_Mox.model.TCG.MagicCard;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.*;

/**
 * This Class is for search a card using the the scryfall api.
 * This class is used to convert the json that is returned to a java object
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class AdvanceSearchCatalog {

    /**
     * @JsonProperty define the exact JSON field name that should be mapped to a
     *               Java field, constructor parameter, or method.
     */
    @JsonProperty("object")
    private String object;

    @JsonProperty("total_cards")
    private int totalCards;

    @JsonProperty("has_more")
    private boolean hasMore;

    @JsonProperty("next_page")
    private String nextPage;

    @JsonProperty("data")
    private List<MagicCard> data;

    // Getters and Setters
    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public List<MagicCard> getData() {
        return data;
    }

    public void setData(List<MagicCard> data) {
        this.data = data;
    }
}
