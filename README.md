# domio-challenge

## Overview

This project is for the Domio Full Stack Engineer coding challenge. The Node application consumes an API that updates every 5 seconds using Axios. The properties in the response are logged in an SQLite database, and if the properties meet certain conditions, an email is sent using Nodemailer.

## Installation

Run "npm install" in the root folder of the project

## Running the application

Start the application with "node app.js". If necessary, the application will create the database automatically. The application will continue to poll the API every 5 seconds until stopped.
