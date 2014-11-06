var Model = require('./model.js');
var Box   = require('./box.js');

var Grid = Model.extend({
  initialize: function(){
    //create a dimxdim grid of Box models
    this.set('boxes', this.createGrid(this.dim));
  },

  createGrid : function(dim){
    var box, 
        that = this;

    return _.map(Array.apply(null, Array(dim)), function(){
      return _.map(Array.apply(null, Array(dim)), function(){
        box = new Box({value: ''});
        box.on('changed', that.boxChanged, that);
        return box;
      });
    });
  }, 

  dim: 9,

  boxChanged: function(){
    this.trigger('changed');
  },

  newGame: function(){}
});

module.exports = Grid;

