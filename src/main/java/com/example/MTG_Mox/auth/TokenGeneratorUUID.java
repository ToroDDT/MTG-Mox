package com.example.MTG_Mox.auth;

import java.util.UUID;

public class TokenGeneratorUUID implements TokenGenerator {
    @Override
    public String createToken() {
        return UUID.randomUUID().toString();
    }
}
