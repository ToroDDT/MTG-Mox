package com.example.MTG_Mox.model.TCG;

import jakarta.persistence.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Entity
public class MagicCard {
    @Id
    @GeneratedValue
    private Long identifier;
    private String id;
    private String name;
    private String object;
    private String oracleId;
    private List<Integer> multiverseIds;
    private Integer mtgoId;
    private Integer tcgplayerId;
    private Integer cardmarketId;
    private String lang;
    private String releasedAt;
    private String uri;
    private String scryfallUri;
    private String layout;
    private boolean highresImage;
    private String imageStatus;
    private String manaCost;
    private Integer cmc;
    private String typeLine;
    private String oracleText;
    private List<String> colors;
    private List<String> colorIdentity;
    private List<String> keywords;
    private List<String> games;
    private boolean reserved;
    private boolean gameChanger;
    private boolean foil;
    private boolean nonfoil;
    private List<String> finishes;
    private boolean oversized;
    private boolean promo;
    private boolean reprint;
    private boolean variation;
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
    private boolean digital;
    private String rarity;
    private String cardBackId;
    private String artist;
    private List<String> artistIds;
    private String illustrationId;
    private String borderColor;
    private String frame;
    private String securityStamp;
    private boolean fullArt;
    private boolean textless;
    private boolean booster;
    private boolean storySpotlight;
    private Integer edhrecRank;
    private Integer pennyRank;
    @ElementCollection
    @CollectionTable(name = "magic_card_image_uris", joinColumns = @JoinColumn(name = "magic_card_id"))
    @MapKeyColumn(name = "uri_key")
    @Column(name = "uri_value")
    private Map<String, String> imageUris = new HashMap<>();

    @ElementCollection
    @CollectionTable(name = "magic_card_legalities", joinColumns = @JoinColumn(name = "magic_card_id"))
    @MapKeyColumn(name = "legality_key")
    @Column(name = "legality_value")
    private Map<String, String> legalities = new HashMap<>();

    @ElementCollection
    @CollectionTable(name = "magic_card_prices", joinColumns = @JoinColumn(name = "magic_card_id"))
    @MapKeyColumn(name = "price_key")
    @Column(name = "price_value")
    private Map<String, String> prices = new HashMap<>();

    @ElementCollection
    @CollectionTable(name = "card_related_uris", joinColumns = @JoinColumn(name = "magic_card_id"))
    @Column(name = "uri_value")
    private Map<String, String> relatedUris = new HashMap<>();

    @ElementCollection
    @CollectionTable(name = "card_purchase_uris", joinColumns = @JoinColumn(name = "magic_card_id"))
    @Column(name = "uri_value")
    private Map<String, String> purchaseUris = new HashMap<>();
    @ManyToOne
    @JoinColumn(name = "commander_id")
    private Commander commander;

    public MagicCard() {

    }

    public MagicCard(String id, String name, String object, String oracleId, List<Integer> multiverseIds,
            Integer mtgoId,
            Integer tcgplayerId, Integer cardmarketId, String lang, String releasedAt, String uri, String scryfallUri,
            String layout, boolean highresImage,
            String imageStatus, Map<String, String> imageUris, String manaCost, Integer cmc, String typeLine,
            String oracleText, List<String> colors, List<String> colorIdentity,
            List<String> keywords, Map<String, String> legalities, List<String> games, boolean reserved,
            boolean gameChanger, boolean foil, boolean nonfoil,
            List<String> finishes, boolean oversized, boolean promo, boolean reprint, boolean variation, String setId,
            String set, String setName, String setType, String setUri,
            String setSearchUri, String scryfallSetUri, String rulingsUri, String printsSearchUri,
            String collectorNumber, boolean digital, String rarity, String cardBackId, String artist,
            List<String> artistIds, String illustrationId, String borderColor, String frame, String securityStamp,
            boolean fullArt, boolean textless, boolean booster, boolean storySpotlight, Integer edhrecRank,
            Integer pennyRank, Map<String, String> prices, Map<String, String> relatedUris,
            Map<String, String> purchaseUris) {
        this.id = id;
        this.name = name;
        this.object = object;
        this.oracleId = oracleId;
        this.multiverseIds = multiverseIds;
        this.mtgoId = mtgoId;
        this.tcgplayerId = tcgplayerId;
        this.cardmarketId = cardmarketId;
        this.lang = lang;
        this.releasedAt = releasedAt;
        this.uri = uri;
        this.scryfallUri = scryfallUri;
        this.layout = layout;
        this.highresImage = highresImage;
        this.imageStatus = imageStatus;
        this.imageUris = imageUris;
        this.manaCost = manaCost;
        this.cmc = cmc;
        this.typeLine = typeLine;
        this.oracleText = oracleText;
        this.colors = colors;
        this.colorIdentity = colorIdentity;
        this.keywords = keywords;
        this.legalities = legalities;
        this.games = games;
        this.reserved = reserved;
        this.gameChanger = gameChanger;
        this.foil = foil;
        this.nonfoil = nonfoil;
        this.finishes = finishes;
        this.oversized = oversized;
        this.promo = promo;
        this.reprint = reprint;
        this.variation = variation;
        this.setId = setId;
        this.set = set;
        this.setName = setName;
        this.setType = setType;
        this.setUri = setUri;
        this.setSearchUri = setSearchUri;
        this.scryfallSetUri = scryfallSetUri;
        this.rulingsUri = rulingsUri;
        this.printsSearchUri = printsSearchUri;
        this.collectorNumber = collectorNumber;
        this.digital = digital;
        this.rarity = rarity;
        this.cardBackId = cardBackId;
        this.artist = artist;
        this.artistIds = artistIds;
        this.illustrationId = illustrationId;
        this.borderColor = borderColor;
        this.frame = frame;
        this.securityStamp = securityStamp;
        this.fullArt = fullArt;
        this.textless = textless;
        this.booster = booster;
        this.storySpotlight = storySpotlight;
        this.edhrecRank = edhrecRank;
        this.pennyRank = pennyRank;
        this.prices = prices;
        this.relatedUris = relatedUris;
        this.purchaseUris = purchaseUris;
    }

    // Getters and Setters for all the fields

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOracleId() {
        return oracleId;
    }

    public void setOracleId(String oracleId) {
        this.oracleId = oracleId;
    }

    public List<Integer> getMultiverseIds() {
        return multiverseIds;
    }

    public void setMultiverseIds(List<Integer> multiverseIds) {
        this.multiverseIds = multiverseIds;
    }

    public Integer getMtgoId() {
        return mtgoId;
    }

    public void setMtgoId(Integer mtgoId) {
        this.mtgoId = mtgoId;
    }

    public Integer getTcgplayerId() {
        return tcgplayerId;
    }

    public void setTcgplayerId(Integer tcgplayerId) {
        this.tcgplayerId = tcgplayerId;
    }

    public Integer getCardmarketId() {
        return cardmarketId;
    }

    public void setCardmarketId(Integer cardmarketId) {
        this.cardmarketId = cardmarketId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public String getReleasedAt() {
        return releasedAt;
    }

    public void setReleasedAt(String releasedAt) {
        this.releasedAt = releasedAt;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getScryfallUri() {
        return scryfallUri;
    }

    public void setScryfallUri(String scryfallUri) {
        this.scryfallUri = scryfallUri;
    }

    public String getLayout() {
        return layout;
    }

    public void setLayout(String layout) {
        this.layout = layout;
    }

    public boolean isHighresImage() {
        return highresImage;
    }

    public void setHighresImage(boolean highresImage) {
        this.highresImage = highresImage;
    }

    public String getImageStatus() {
        return imageStatus;
    }

    public void setImageStatus(String imageStatus) {
        this.imageStatus = imageStatus;
    }

    public Map<String, String> getImageUris() {
        return imageUris;
    }

    public void setImageUris(Map<String, String> imageUris) {
        this.imageUris = imageUris;
    }

    public String getManaCost() {
        return manaCost;
    }

    public void setManaCost(String manaCost) {
        this.manaCost = manaCost;
    }

    public Integer getCmc() {
        return cmc;
    }

    public void setCmc(Integer cmc) {
        this.cmc = cmc;
    }

    public String getTypeLine() {
        return typeLine;
    }

    public void setTypeLine(String typeLine) {
        this.typeLine = typeLine;
    }

    public String getOracleText() {
        return oracleText;
    }

    public void setOracleText(String oracleText) {
        this.oracleText = oracleText;
    }

    public List<String> getColors() {
        return colors;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }

    public List<String> getColorIdentity() {
        return colorIdentity;
    }

    public void setColorIdentity(List<String> colorIdentity) {
        this.colorIdentity = colorIdentity;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public Map<String, String> getLegalities() {
        return legalities;
    }

    public void setLegalities(Map<String, String> legalities) {
        this.legalities = legalities;
    }

    public List<String> getGames() {
        return games;
    }

    public void setGames(List<String> games) {
        this.games = games;
    }

    public boolean isReserved() {
        return reserved;
    }

    public void setReserved(boolean reserved) {
        this.reserved = reserved;
    }

    public boolean isGameChanger() {
        return gameChanger;
    }

    public void setGameChanger(boolean gameChanger) {
        this.gameChanger = gameChanger;
    }

    public boolean isFoil() {
        return foil;
    }

    public void setFoil(boolean foil) {
        this.foil = foil;
    }

    public boolean isNonfoil() {
        return nonfoil;
    }

    public void setNonfoil(boolean nonfoil) {
        this.nonfoil = nonfoil;
    }

    public List<String> getFinishes() {
        return finishes;
    }

    public void setFinishes(List<String> finishes) {
        this.finishes = finishes;
    }

    public boolean isOversized() {
        return oversized;
    }

    public void setOversized(boolean oversized) {
        this.oversized = oversized;
    }

    public boolean isPromo() {
        return promo;
    }

    public void setPromo(boolean promo) {
        this.promo = promo;
    }

    public boolean isReprint() {
        return reprint;
    }

    public void setReprint(boolean reprint) {
        this.reprint = reprint;
    }

    public boolean isVariation() {
        return variation;
    }

    public void setVariation(boolean variation) {
        this.variation = variation;
    }

    public String getSetId() {
        return setId;
    }

    public void setSetId(String setId) {
        this.setId = setId;
    }

    public String getSet() {
        return set;
    }

    public void setSet(String set) {
        this.set = set;
    }

    public String getSetName() {
        return setName;
    }

    public void setSetName(String setName) {
        this.setName = setName;
    }

    public String getSetType() {
        return setType;
    }

    public void setSetType(String setType) {
        this.setType = setType;
    }

    public String getSetUri() {
        return setUri;
    }

    public void setSetUri(String setUri) {
        this.setUri = setUri;
    }

    public String getSetSearchUri() {
        return setSearchUri;
    }

    public void setSetSearchUri(String setSearchUri) {
        this.setSearchUri = setSearchUri;
    }

    public String getScryfallSetUri() {
        return scryfallSetUri;
    }

    public void setScryfallSetUri(String scryfallSetUri) {
        this.scryfallSetUri = scryfallSetUri;
    }

    public String getRulingsUri() {
        return rulingsUri;
    }

    public void setRulingsUri(String rulingsUri) {
        this.rulingsUri = rulingsUri;
    }

    public String getPrintsSearchUri() {
        return printsSearchUri;
    }

    public void setPrintsSearchUri(String printsSearchUri) {
        this.printsSearchUri = printsSearchUri;
    }

    public String getCollectorNumber() {
        return collectorNumber;
    }

    public void setCollectorNumber(String collectorNumber) {
        this.collectorNumber = collectorNumber;
    }

    public boolean isDigital() {
        return digital;
    }

    public void setDigital(boolean digital) {
        this.digital = digital;
    }

    public String getRarity() {
        return rarity;
    }

    public void setRarity(String rarity) {
        this.rarity = rarity;
    }

    public String getCardBackId() {
        return cardBackId;
    }

    public void setCardBackId(String cardBackId) {
        this.cardBackId = cardBackId;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public List<String> getArtistIds() {
        return artistIds;
    }

    public void setArtistIds(List<String> artistIds) {
        this.artistIds = artistIds;
    }

    public String getIllustrationId() {
        return illustrationId;
    }

    public void setIllustrationId(String illustrationId) {
        this.illustrationId = illustrationId;
    }

    public String getBorderColor() {
        return borderColor;
    }

    public void setBorderColor(String borderColor) {
        this.borderColor = borderColor;
    }

    public String getFrame() {
        return frame;
    }

    public void setFrame(String frame) {
        this.frame = frame;
    }

    public String getSecurityStamp() {
        return securityStamp;
    }

    public void setSecurityStamp(String securityStamp) {
        this.securityStamp = securityStamp;
    }

    public boolean isFullArt() {
        return fullArt;
    }

    public void setFullArt(boolean fullArt) {
        this.fullArt = fullArt;
    }

    public boolean isTextless() {
        return textless;
    }

    public void setTextless(boolean textless) {
        this.textless = textless;
    }

    public boolean isBooster() {
        return booster;
    }

    public void setBooster(boolean booster) {
        this.booster = booster;
    }

    public boolean isStorySpotlight() {
        return storySpotlight;
    }

    public void setStorySpotlight(boolean storySpotlight) {
        this.storySpotlight = storySpotlight;
    }

    public Integer getEdhrecRank() {
        return edhrecRank;
    }

    public void setEdhrecRank(Integer edhrecRank) {
        this.edhrecRank = edhrecRank;
    }

    public Integer getPennyRank() {
        return pennyRank;
    }

    public void setPennyRank(Integer pennyRank) {
        this.pennyRank = pennyRank;
    }

    public Map<String, String> getPrices() {
        return prices;
    }

    public void setPrices(Map<String, String> prices) {
        this.prices = prices;
    }

    public Map<String, String> getRelatedUris() {
        return relatedUris;
    }

    public void setRelatedUris(Map<String, String> relatedUris) {
        this.relatedUris = relatedUris;
    }

    public Map<String, String> getPurchaseUris() {
        return purchaseUris;
    }

    public void setPurchaseUris(Map<String, String> purchaseUris) {
        this.purchaseUris = purchaseUris;
    }
}
