# Employee
This is an Angular Framework based Employee Management System. It stores employee details, show employees on leave and also to assign employees dates on leave. 

It has a login page where the one who manage the employees information has to login using the credentials that follows:
username = admin
password= patrick123
#Languages on Frontend  
Typescript, Html, css and Javascript.

## On the Backend
Uses a Node.js server application written in JavaScript using the Express framework and the PostgreSQL database driver which uses port 5432. The server listens for HTTP requests on port 8100 and defines several routes for handling CRUD operations on two database tables: "employees" which stores employees details and "employ" which stores employ leave information.

The server application provides a basic REST API for managing employee details and leave request data in a PostgreSQL database. The server uses middleware to parse JSON request bodies and enable Cross-Origin Resource Sharing (CORS), which allows the server to accept requests from different domains.


############### To run the server run node server.js 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

