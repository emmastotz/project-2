### **CHZBRG the Sequel**
#### A sequelized version of CHZBGR

##### PROBLEM/SOLUTION
A restaurant app that lets users input the names of burgers they'd like to eat.

##### CHZBGR Overview
* server.js (Sets up our app to use express and to listen at a port.)
* package.json
* package-lock.json
* config
  * config.json file created by sequelize
* controllers
  * burgers_controller.js (Routes our functionality)
* models
  * burgers.js (Sequelize model for burger data.)
  * index.js (Boiler plate Sequelize file.)
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

This app was created entirely by Emma Stotz