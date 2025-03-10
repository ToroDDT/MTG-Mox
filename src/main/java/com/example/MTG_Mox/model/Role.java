package com.example.MTG_Mox.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Role {
    @Id
    private String name;  // Role name (e.g., "USER", "ADMIN")

    public Role(String name) {
        this.name = name;
    }

    public Role(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
