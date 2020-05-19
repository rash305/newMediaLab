package com.newmedia.deafapi.api.security;

import com.newmedia.deafapi.api.security.filters.JWTAuthenticationFilter;
import com.newmedia.deafapi.api.security.filters.JWTAuthorizationFilter;
import com.newmedia.deafapi.api.services.Interfaces.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private final IAccountService userDetailsService;
    private final PasswordEncoder bCryptPasswordEncoder;

    public WebSecurity(PasswordEncoder bCryptPasswordEncoder, IAccountService userDetailsService) {

        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JWTAuthenticationFilter JWTAuthFilter = new JWTAuthenticationFilter(authenticationManager());
        JWTAuthFilter.setFilterProcessesUrl("/api/auth/login");

        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers("/api/validation**").permitAll()
                .antMatchers("/api/signs**").permitAll()
                .antMatchers("/api/categories**").permitAll()
                .antMatchers("/api/admin**").permitAll()
                .antMatchers("/api/accounts**").permitAll()
                .antMatchers("/api/admin**").permitAll()
                .antMatchers("/api/accounts**").permitAll()
//                .anyRequest().authenticated()
                .and()
                .addFilter(JWTAuthFilter)
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

/*
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
*/
}
