# Patients-API

Patient AUDIT (Alcohol Use Disorders Identification Test) application is to identify persons with hazardous and harmful 
patterns of alcohol consumption. The AUDIT was developed by WHO as a simple method of screening for excessive drinking and 
assist patients.

Audit : https://github.com/Narahari-Battala/Patients-API/blob/master/Audit.pdf

## Requirement ##
* [Expressjs](http://expressjs.com/zh-tw/) - API Server
* [Nodejs](https://nodejs.org/en/) - Backend Framework
* [NPM](https://www.npmjs.com/) - Package Management
* [Jade](http://jade-lang.com/) - Template Engine
* [Jquery](https://jquery.com/) - Jquery

## Packages ##
>1. [mysql](https://www.npmjs.com/package/mysql)
>2. [body-parser](https://www.npmjs.com/package/body-parser) 
>3. [cookie-parser](https://www.npmjs.com/package/cookie-parser)
>4. [morgan](https://www.npmjs.com/package/morgan)
>5. [http-errors](https://www.npmjs.com/package/http-errors)

This Application has 3 parts

### API:

API handles the Authentication, Authorization , patient responses, patient login, patient registration and patient lists. 
I have used JWT (JSON Web Tokens) for Authentication and Authorization. I have used node js , Express, MySQL, body parser for 
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

	

