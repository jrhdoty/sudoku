'use strict';
var Game    = require('./game.js'),
    GameView = require('./gameView.js');

(function(){
  $(document).ready(function(){
    var game     = new Game({});
    game.reset();

    var gameView = new GameView({model: game});

    $('.sudoku').append(gameView.render());
  });
})();