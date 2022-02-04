# Church Management Application

More information on the back-end can be found here:
[Back-end GitHub Repo link](https://github.com/nateonmission/church_manager_api)

## Introduction 
Medium-sized churches frequently have difficult keeping track of their members and small-groups. This application seeks to help in that area by making it easier for church staff to track membership (including family relationships) and small-groups composition.

## Technology
The back-end API is a Java application built using the Spring Boot Framework to simplify the data connection. The Database itself is Postgres. The front-end is built with Angular. The IDEs that I used were JetBrains IntelliJ for the Java API and Microsoft's Visual Studio Code for the Angular components. Other tools used during development include Postman (for testing the API endpoints) and PGAdmin (for managing the Postgres DB). Both sides of the app will be deployed on Heroku.

## Installation
This front-end is built with [Angular](https://github.com/angular/angular-cli) version 13.1.2.
After cloaning the repository, you can use Angular's buil in dev server: Run `ng serve` and navigate to `http://localhost:4200/`. 

## Use of the Application
When you load the splash page and login, you will be greeted with a HOME page. Click PEOPLE to begin adding Members, Attenders, Children/Youth, and Staff. Click on GROUPS to create Sunday School Classes, Mid-week groups, or other affinity groups. Then on the PEOPLE tab, you can link children, parents, and spouses. On the GROUPS page, you can link group members, volunteer leaders, and staff supervisor. There is a DELETE page if you need to delete a person or group.

## Problems and Overcoming Them
### Back-End
* One-to-one relationships
* One-to-many relationships
* CORS permissions
* Learning what JPA can and can't do
* Java deployment on Heroku

### Front-End
* Getting a grasp on Observables
* Dealing with variably formatted JSON received from API
* Form behavior in Angular
* More CORS issues
* Angular deployment on Heroku

## Future Opportunities
* Finish the front-end deployment
* Make it easier to search for people by name
* Better form validation
* Authentication and Authorization
* More interesting styling
