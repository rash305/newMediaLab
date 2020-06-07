package com.newmedia.deafapi.api.security.filters;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.newmedia.deafapi.api.models.Account;
import com.newmedia.deafapi.api.security.JWTToken;
import com.newmedia.deafapi.api.services.Interfaces.IAccountService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.newmedia.deafapi.api.security.SecurityConstants.EXPIRATION_TIME;
import static com.newmedia.deafapi.api.security.SecurityConstants.HEADER_STRING;
import static com.newmedia.deafapi.api.security.SecurityConstants.SECRET;
import static com.newmedia.deafapi.api.security.SecurityConstants.TOKEN_PREFIX;


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    private IAccountService userDetailsService;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, IAccountService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            Account creds = new ObjectMapper()
                    .readValue(req.getInputStream(), Account.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {
        Account account = userDetailsService.getAccountByUsername(((User) auth.getPrincipal()).getUsername());

        String token = JWT.create()
                .withSubject(account.getId())
                //.withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);

        if (req.getRequestURI().contains("/api/auth/login")) {
            ObjectMapper mapper = new ObjectMapper();
            JWTToken tokenModel = new JWTToken();
            tokenModel.setToken(TOKEN_PREFIX + token);
            res.setHeader("Content-Type", "application/json");
            res.getWriter().write(mapper.writeValueAsString(tokenModel));
        }
    }
}