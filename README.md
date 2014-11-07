Sudoku
=======
###Description
An implementation of the classic game of Sudoku.

###Technologies Used
- Javascript
- SASS/CSS 
- Gulp
- Browserify
- Karma/Mocha/Chai

###Implementation
##Vertebra - App Framework
In order to give structure to this application I created a lightweight MV* framework that reimplements some aspects of Backbone Model and View APIs.  This included creating an 'extend' method on Views and Models that correctly sets up the prototype chain, allowing a user to further extend and subclass their Models and Views.    

This allowed me to have a clear seperation of concerns for the components of my application.  In addition to this I created a general event emitter mixin to extend event registration and emission to any arbitrary object.

###Testing
I created unit tests for most components of this application to ensure all of the components worked in isolation.  This allowed me to quickly update elements of the program while having confidence I was not making breaking changes. I used Mocha as my testing framework and Chai as my assertion library.  Karma was used for running the tests.  

Karma is especially useful when running tests for an application that is built with browserify because it allows for the pre-processing of test and application files with browserify before running tests.

###Build System
Gulp was used for performing all of the build and debugging tasks for this application including:
- linting
- injecting scripts/styles into the index.html
- compiling sass files to css
- bundling dependencies with browserify
- running karma
- and watching for file changes

###Styling
Styles were written with SASS to allow for the use of mixins and variables and compiled to css with a gulp sass task






