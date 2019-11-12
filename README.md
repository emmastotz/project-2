### **BLOCK APP**
#### A sequelized version of CHZBGR

##### PROBLEM/SOLUTION
A time table scheduling App that lets users(students) sign in and choose what time and date they'd like to take a subject, then add it to their calendar.

##### BLOCK Overview
* server.js (Sets up our app to use express and to listen at a port.)
* package.json
* package-lock.json
* config
  * config.json file created by sequelize
* controllers
  * classes_controller.js (Routes our functionality)
* models
  * db (Database using MySQL)
  * allData.js (Sequelize model for allData data.)
  * classes.js (Sequelize model for classes data).
  * index.js (Boiler plate Sequelize file.)
  * students.js (Sequelize model for students)
  * subjects.js (Sequelize model for subjects)
* public
  * assets
    * css
      * style.css (Main stylesheet.)
      * animate.css (Animation stylesheet.)
      * reset.css (Resets any style that the browser might have preloaded.)
    * img (All images used in project.)
    * js
      * app.js (Runs the click functionality of the app.)
* views
  * index.handlebars (Dynamically holds html for use in the main file.)
  * layouts
    * main.handlebars (The layout that our index.handlebars references.)

##### Instructions to Run the App
* Hosted on Heroku here: https://evil-ghoul-08418.herokuapp.com/

* OR clone the file from github. (https://github.com/emmastotz/chzbgr)
* Install all dependencies needed to run the program ("npm install").
* Run the applications using node in the command line ("node server.js") and open up browser with correct port to see the magic.

##### Technologies Used
* CSS3
* Animate.css
* Bootstrap 4
* JavaScript
* Node
* NPMs: Express, Handlebars, dotenv, Sequelize, Sequelize-cli

This app was created by Andy Tran, Alex Simuro, Emma Stotz and Sandy Enow