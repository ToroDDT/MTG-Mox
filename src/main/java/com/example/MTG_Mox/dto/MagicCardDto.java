package com.example.MTG_Mox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MagicCardDto {
private String object;
    private String id;
    private String oracleId;
    private List<Integer> multiverseIds;
    private Integer mtgoId;
    private Integer tcgplayerId;
    private Integer cardmarketId;
    private String name;
    private String lang;
    private String releasedAt;
    private String uri;
    private String scryfallUri;
    private String layout;
    private Boolean highresImage;
    private String imageStatus;
    private Map<String, String> imageUris; // small, normal, large, etc.
    private String manaCost;
    private Integer cmc;
    private String typeLine;
    private String oracleText;
    private List<String> colors;
    private List<String> colorIdentity;
    private List<String> keywords;
    private Map<String, String> legalities;
    private List<String> games;
    private Boolean reserved;
    private Boolean gameChanger;
    private Boolean foil;
    private Boolean nonfoil;
    private List<String> finishes;
    private Boolean oversized;
    private Boolean promo;
    private Boolean reprint;
    private Boolean variation;
    private String setId;
    private String set;
    private String setName;
    private String setType;
    private String setUri;
    private String setSearchUri;
    private String scryfallSetUri;
    private String rulingsUri;
    private String printsSearchUri;
    private String collectorNumber;
    private Boolean digital;
    private String rarity;
    private String cardBackId;
    private String artist;
    private List<String> artistIds;
    private String illustrationId;
    private String borderColor;
    private String frame;
    private String securityStamp;
    private Boolean fullArt;
    private Boolean textless;
    private Boolean booster;
    private Boolean storySpotlight;
    private Integer edhrecRank;
    private Integer pennyRank;
    private Map<String, String> prices;
    private Map<String, String> relatedUris;
    private Map<String, String> purchaseUris;
	
}
