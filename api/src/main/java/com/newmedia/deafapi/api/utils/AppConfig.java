/*
package com.newmedia.deafapi.api.utils;

import com.mongodb.MongoCredential;
import com.newmedia.deafapi.api.ApiApplication;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoClientFactoryBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Arrays;

@Configuration
@EnableMongoRepositories(basePackages = "com.newmedia.deafapi.api.dataservices")
public class AppConfig {

    @Autowired
    private Environment env;
    private static final Logger logger = LogManager.getLogger(ApiApplication.class);

     //* Factory bean that creates the com.mongodb.MongoClient instance
     //* Dunno why some beans are deprecated because this is used in the official spring.io documentation


    public @Bean
    MongoClientFactoryBean mongo() {
        String mongoHost = env.getProperty("app.mongodb.host");
        int mongoPort = Integer.parseInt(env.getProperty("app.mongodb.port"));
        String mongoUser = env.getProperty("app.mongodb.user");
        String mongoDatabase = env.getProperty("app.mongodb.database");
        logger.debug("Mongo Database: " + mongoDatabase);
        logger.debug("Mongo User: " + mongoUser);

        // Note that we store the mongo password in the configuration for now
        // If an attacker gains access he immediately has database access too..
        // Cannot be fixed by moving or encrypting the password because here we store it in the memory as a string..
        String mongoPassword = env.getProperty("app.mongodb.password");

        MongoCredential[] credentialArray = new MongoCredential[1];
        credentialArray[0] = MongoCredential.createCredential(mongoUser, mongoDatabase, mongoPassword.toCharArray());
        ;
        MongoClientFactoryBean mongo = new MongoClientFactoryBean();
        mongo.setHost(mongoHost);
        mongo.setPort(mongoPort);
        mongo.setCredentials((MongoCredential[]) credentialArray);
        return mongo;
    }

}
*/
