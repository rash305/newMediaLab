package com.newmedia.deafapi.api.security;

public class JWTToken {
    String Token;

    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        Token = token;
    }

    public JWTToken() {
    }
}
