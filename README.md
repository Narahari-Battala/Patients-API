# Patients-API

Patient AUDIT (Alcohol Use Disorders Identification Test) application is to identify persons with hazardous and harmful 
patterns of alcohol consumption. The AUDIT was developed by WHO as a simple method of screening for excessive drinking and 
assist patients.

Audit : https://github.com/Narahari-Battala/Patients-API/blob/master/Audit.pdf

## Requirement ##
* [MongoDB](https://www.mongodb.com/) - Database
* [Expressjs](http://expressjs.com/zh-tw/) - API Server
* [Nodejs](https://nodejs.org/en/) - Backend Framework
* [NPM](https://www.npmjs.com/) - Package Management

## Packages ##
>1. [Mongoose](http://mongoosejs.com/) - mongodb object modeling
>2. [body-parser](https://www.npmjs.com/package/body-parser) - http request body parser.

This Application has 3 parts

### API:

API handles the Authentication, Authorization , patient responses, patient login, patient registration and patient lists. 
I have used JWT (JSON Web Tokens) for Authentication and Authorization. I have used node js , Express, SQL, body parser for 
developing this API.


### Admin's Web Portal:

Admins use this application to create and register patients, see the patient responses to the test, see the patients list, 
The username and passwords of the new patients will be provided to the patients on check in.

I have used Data Tables (https://datatables.net) library for displaying patient's list, patient's responses. Admin 
can also create a printable report of patient's responses.

I have used Node JS, Jade template engine, HTML, CSS, JQuery, Data Tables, cookie parser, expression session, http-erros, 
morgan, body parser for developing this web application.

### Mobile Application (IOS):

Mobile app provides authentication, using a username and password mechanism. Mobile app is only used by the patient role.

Mobile app presents the survey questions in the survey provided in the below link

All the user responses should be stored on the server and all communication with the server is enabled through the API.

	

