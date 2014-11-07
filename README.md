Sudoku
=======
##Description
An implementation of the classic game of Sudoku.  [Demo it here!](http://jrhdoty.github.io/sudoku)

##Technologies Used
- Javascript/CSS/HTML
- SASS - css preprocessor 
- Gulp - build system for automating frequent and tedious tasks
- Browserify - allows use of 'require' statements and module loading in the browser
- Karma/Mocha/Chai - testing tool suite

##Implementation
###Vertebra - App Framework
In order to give structure to this application I created a lightweight MV* framework that reimplements some aspects of Backbone Model and View APIs.  This included creating an 'extend' method on Views and Models that correctly sets up the prototype chain, allowing a user to further extend and subclass their Models and Views.    

This allowed me to have a clear seperation of concerns for the components of my application.  In addition to this I created a general event emitter mixin to extend event registration and emission to any arbitrary object.

###Application Models
The application was broken into individual models in order to allow for more modular and testable code.  The models included in this application are:
####Box
The Box model represents an individual cell of the sudoku board.

####Grid
The Grid model contains the entire 9x9 matrix of box models that reprsent the sudoku board.  It contains logic for generating new games, determining if a game has been won and detecting row/column/quadrant conflicts on user input.

####Game
This model contains a Grid and has functions for indicating that a game has been won or triggering a new game

###Application Views
Each of the above models has an associated view.  The view has a render function for updating dom elements with data from its associated model.  It also acts as a controller, listening for user input and updating its model accordingly.

##Testing
I created unit tests for most components of this application to ensure all of the components worked in isolation.  This allowed me to quickly update elements of the program while having confidence I was not making breaking changes. I used Mocha as my testing framework and Chai as my assertion library.  Karma was used for running the tests.  

Karma is especially useful when running tests for an application that is built with browserify because it allows for the pre-processing of test and application files with browserify before running tests.

##Build System
Gulp was used for performing all of the build and debugging tasks for this application including:
- linting
- injecting scripts/styles into the index.html
- compiling sass files to css
- bundling dependencies with browserify
- running karma
- and watching for file changes

##Styling
Styles were written with SASS to allow for the use of mixins and variables and compiled to css with a gulp sass task
