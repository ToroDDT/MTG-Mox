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

    @OneToMany(mappedBy = "commander")
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

    public void addMagicCard(MagicCard magicCard) {
        this.cards.add(magicCard);
    }

    public List<MagicCard> getMagicCards() {
        return cards;
    }
}
