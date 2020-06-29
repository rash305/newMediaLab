# WeSign! 
## Developed by Group 3 for New Media Lab

This app is created to help the Fynn foundation with the education of parents of deaf children in developing countries. The app is designed with a pocket dictionary feel. Because of the wide variety in sign language in all the different languages that are spoken in developing countries, the database has to be extended by the users of the app. 

## Installation
The backend API is written in Java with the Spring boot framework and thus should be hosted by a Java web engine. We used Tomcat on a Ubuntu server for this. 

If the app is hosted as a web application any web server engine will do. The app is written in Angular and exported as a SPA application. Note to get the URL routing of SPA applications working the URL routing has to be forwarded to the Index.html

The following rewrite.config is used for a backend APi hosted on "www.domain.nl/api_war/"
```bash
RewriteCond %{REQUEST_PATH} !-f
RewriteCond %{REQUEST_URI} !^/api_war/.*$ [NC]
RewriteCond %{REQUEST_URI} !^/dev/.*$ [NC]
RewriteRule ^/(.*) /index.html 
```

The environment variables can be changed in the following files:
``` Config
./website/src/environments/environment.prod.ts => config the URL of the backend API (Before building the Angular app)
./api/src/main/resources/application-prod.properties => config all environment values the API usage (Can changed during production)
./api/src/main/resources/googlekeys.json => The API key to communication with the Google translate API (Can be changed during production)
```

We preferred to develop the Angular project in Webstorm and the API in IntelliJ. Yet, any IDE will do.  
The angular website can be served by Node.JS with the command: 
```bash
ng serve
```
The API can be started by using the Spring boot compiler configuration and set the main class to: 
``` bash
com.newmedia.deafapi.api.ApiApplication
```

## Exporting the application

For the Angular app open a cmd prompt in the ./website folder and change the environment variables to match the URL of the API.
```Bash
ng build --prod 
```

The API uses maven, which makes it easy to export the application as well:
```Bash
mvn clean install -P prod
``` 

## Building the APP
Due to the different mobile platforms and versions and the frequent updates of the corresponding development tools we decided to not include the detailed Cordova procedure. 
``` 
#A good source we used is:
https://medium.com/@EliaPalme/how-to-wrap-an-angular-app-with-apache-cordova-909024a25d79

# We are aware that this link might die in the future, yet 
# we experienced that research to get Cordova to work is needed for each platform.
# The main issues with Cordova are caused by a missing development environment
# set up for the target platform. The Cordova build steps were quite straight forward:
npm install -g cordova
cordova create CordovaApp com.nml.wesign! "WeSign"

ng build --prod --base-href . --output-path ../CordovaApp/www/


cd CordovaApp
cordova platform add browser
cordova run browser

# That's it. You have now created a build for the Cordova web browser.
# Look into other options that can be used in the "cordova platform add ***" statement
# Each device could have his own configuration steps for example we tested the API 
# on an http server for demo purposes and therefor we had to add HTTP support in the Cordova config.xml:
<edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application">
    <application android:usesCleartextTraffic="true" />
</edit-config>
    

```

# Database
The app uses a MongoDB as database. The connection has to be configured in the API environment properties. 

# Data leak in source code
We are aware that the source code contains some passwords, keys and tokens. All these values are uploaded to the Github to make the development process easier as we all used the same remote development resources (Same dev database and same external API accounts). For this reason, the repository is private and the environment properties are changed when the API is deployed to a demo server.

# Branches

The master repository contains all versions that are used during deliveries of the project 

The Test branch was to automatically build and deploy a version to the Ubuntu server. This gives room to do bug fixes just before delivery. If a fix causes new problems we still have a stable version in the master.
Unfortunately, this branch is not used as the Jenkins Build server crashed because there was not enough ram available on our server. Updating the VPS would cost too much, as the VPS was already 5 dollar a month.

The Acc branch was set up to automatically build and deploy a version to the Ubuntu server. With this branch, the code directly coming from dev could be tested with a database containing clean data only. Also, differences between the local development environment and the server environment could be noted.  
Unfortunately, this branch is not used as the Jenkins Build server crashed because there was not enough ram available on our server. Updating the VPS would cost too much, as the VPS was already 5 dollar a month.

The dev branch is used for development. 
