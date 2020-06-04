package com.newmedia.deafapi.api.utils.mongo;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class MongoGridFsTemplate  extends AbstractMongoConfiguration {

    @Value("${app.mongodb.host}")
    private String mongoAddress;

    @Value("${app.mongodb.database}")
    private String mongoDatabase;

    @Value("${app.mongodb.port}")
    private int mongoPort;

    @Value("${app.mongodb.user}")
    private String user;

    @Value("${app.mongodb.password}")
    private String password;

    @Bean
    public GridFsTemplate gridFsTemplate() throws Exception {
        return new GridFsTemplate(mongoDbFactory(), mappingMongoConverter());
    }

    @Override
    protected String getDatabaseName() {
        return mongoDatabase;
    }

    @Override
    public MongoClient mongoClient() {
        List<ServerAddress> seeds = new ArrayList<ServerAddress>();
        seeds.add( new ServerAddress(mongoAddress, mongoPort));

        List<MongoCredential> credentials = new ArrayList<MongoCredential>();
        credentials.add(
                MongoCredential.createCredential(
                        user,
                        mongoDatabase,
                        password.toCharArray()
                )
        );

        return new MongoClient(seeds, credentials);
    }
}
