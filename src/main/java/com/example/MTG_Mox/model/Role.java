package com.example.MTG_Mox.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Role {
    @Id
    private String name;  // Role name (e.g., "USER", "ADMIN")

    public Role(String name) {
        this.name = name;
    }

    public Role(){

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return Objects.equals(name, role.name);
    }
    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public String toString() {
        return "Role{" +
                "name='" + name + '\'' +
                '}';
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
