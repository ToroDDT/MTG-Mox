package com.example.MTG_Mox.model.TCG;

import com.example.MTG_Mox.model.TCG.MagicCard;
import jakarta.persistence.Id;
import jakarta.persistence.*;

import java.util.*;

@Entity
public class Commander {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    public Commander(String name) {
        this.name = name;
    }

    @OneToMany(mappedBy = "commander", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MagicCard> cards = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addCard(MagicCard magicCard) {
        // create a new magic Card
        MagicCard newMagicCard = magicCard;
        // Set the commander that this card belongs to
        newMagicCard.setCommander(this);
        // add magic card to to Commander card list
        cards.add(newMagicCard);

    }

    public void removeCard(MagicCard magicCard) {
        cards.remove(magicCard);
        magicCard.setCommander(null);
    }

    public List<MagicCard> getMagicCards() {
        return cards;
    }
}
