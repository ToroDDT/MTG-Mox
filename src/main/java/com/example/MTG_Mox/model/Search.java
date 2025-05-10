package com.example.MTG_Mox.model;

public class Search {

    private String name;
    private String relativePower;
    private String relativeToughness;
    private String set;
    private String card_type;
    private String[] colors_identity;
    private Integer mana_vale;
    private Integer power;
    private Integer toughness;

    public Search() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRelativePower() {
        return relativePower;
    }

    public void setRelativePower(String relativePower) {
        this.relativePower = relativePower;
    }

    public String getRelativeToughness() {
        return relativeToughness;
    }

    public void setRelativeToughness(String relativeToughness) {
        this.relativeToughness = relativeToughness;
    }

    public String getSet() {
        return set;
    }

    public void setSet(String set) {
        this.set = set;
    }

    public String getCard_type() {
        return card_type;
    }

    public void setCard_type(String card_type) {
        this.card_type = card_type;
    }

    public String[] getColors_identity() {
        return colors_identity;
    }

    public void setColors_identity(String[] colors_identity) {
        this.colors_identity = colors_identity;
    }

    public Integer getMana_vale() {
        return mana_vale;
    }

    public void setMana_vale(Integer mana_vale) {
        this.mana_vale = mana_vale;
    }

    public Integer getPower() {
        return power;
    }

    public void setPower(Integer power) {
        this.power = power;
    }

    public Integer getToughness() {
        return toughness;
    }

    public void setToughness(Integer toughness) {
        this.toughness = toughness;
    }
}
