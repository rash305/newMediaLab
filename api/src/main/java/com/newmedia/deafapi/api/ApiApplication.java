package com.newmedia.deafapi.api;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages={"com.newmedia.deafapi.api.controllers", "com.newmedia.deafapi.api.services"})
public class ApiApplication extends SpringBootServletInitializer implements ApplicationRunner {

    private static final Logger logger = LogManager.getLogger(ApiApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder
                                                         application) {
        return application.sources(ApiApplication.class);
    }

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
        logger.debug("Debugging log enabled");
    }
}




