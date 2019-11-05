# domio-challenge

## Overview

This project is for the Domio Full Stack Engineer coding challenge. The Node application consumes an API that updates every 5 seconds using Axios. The properties in the response are logged in an SQLite database, and if the properties meet certain conditions, an email is sent using Nodemailer.

## Written Portion

_Now, let's assume that over time, we'll be adding dozens of different property types
with their own message formats. How do we support this? Would you change anything in your
implementation?_

I would consider two ways of accomplishing this:

1 - Expand upon the variable based template that I created for this project. One could use conditions and variables to construct the email according to the user's needs dynamically. If more flexibility is needed, I would consider option 2.

2 - Create an interface and database for creating and storing email templates that can be used at run time. This method has the advantage of being highly flexible and easily editable by the teams that are likely to be using the templates (as opposed to having to engage the engineering team each time a new template is needed). While there is more initial overhead with this approach, it could save much time down the line if we expect to add many message formats (and especially if they need to be easily editable in the future).

## Installation

Run "npm install" in the root folder of the project

## Running the application

Start the application with "node app.js". If necessary, the application creates the database automatically. The application continues to poll the API every 5 seconds until stopped.

## Libraries used

Axios
Nodemailer
SQLite
