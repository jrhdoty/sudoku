var Grid  = require('./grid.js'),
    Model = require('./model.js');

var Game = Model.extend({
  initialize: function(){
    var grid = new Grid({});
    grid.on('won', this.won, this);
    this.set('grid', grid);
  },

  reset: function(){
    console.log('called full reset on grid');
    this.get('grid').newGame(25);
  },

  won: function(){
    this.trigger('won');
  }
});

module.exports = Game;