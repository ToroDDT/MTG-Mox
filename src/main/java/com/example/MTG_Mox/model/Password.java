package com.example.MTG_Mox.model;

public class Password {
    private String password;
    private String confirmedPassword;
    public Password(String password, String confirmedPassword, Boolean passwordsMatches) {
        this.password = password;
        this.confirmedPassword = confirmedPassword;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmedPassword() {
        return confirmedPassword;
    }

    public void setConfirmedPassword(String confirmedPassword) {
        this.confirmedPassword = confirmedPassword;
    }


}
