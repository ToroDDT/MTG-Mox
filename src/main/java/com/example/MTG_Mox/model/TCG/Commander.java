package com.example.MTG_Mox.model.TCG;

import jakarta.persistence.Id;
import jakarta.persistence.*;
import java.util.*;

@Entity
public class Commander {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "commander")
    private List<MagicCard> cards = new ArrayList<>();
}
