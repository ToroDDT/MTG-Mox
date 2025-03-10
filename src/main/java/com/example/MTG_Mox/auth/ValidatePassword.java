package com.example.MTG_Mox.auth;

import java.util.Objects;

public class ValidatePassword implements Validator {
    @Override
    public Boolean validate(String string, String string2) {
        return Objects.equals(string, string2);
    }
}
