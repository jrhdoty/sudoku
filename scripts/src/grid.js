var Model   = require('./model.js');
var Box     = require('./box.js');
var helpers = require('./helpers.js');

var Grid = Model.extend({
  initialize: function(){
    //create a dimxdim grid of Box models
    this.set('boxes', this.createGrid(this.dim));
    this.set('rowConflicts', []);
    this.set('colConflicts', []);
    this.set('quadrantConflicts', []);
  },

  createGrid : function(dim){
    var box, 
        that = this;

    return _.map(Array.apply(null, Array(dim)), function(){
      return _.map(Array.apply(null, Array(dim)), function(){
        box = new Box({value: '', conflict: false, mutable: true});
        box.on('changed', that.boxChanged, that);
        return box;
      });
    });
  }, 

  dim: 9,

  boxChanged: function(){
    this.trigger('changed');
    this.checkRows();
    this.checkColumns();
    this.checkQuadrants();
    if (this.hasWon()){
      this.won();
    }
  },

  checkRows: function(){
    var values, value;
    var boxes = this.get('boxes');
    var oldRowConflicts = this.get('rowConflicts');
    var newRowConflicts = [];
    for( var i = 0; i < boxes.length; i++){
      values = {};
      for( var j = 0; j < boxes.length; j++ ){
        value = boxes[i][j].get('value');
        if(values[value] === true){
          newRowConflicts.push(i);
        } else if(value !== ''){
          values[value] = true;
        }
      }
    }
    if(!helpers.compareArrays(oldRowConflicts, newRowConflicts)){
      this.set('rowConflicts', newRowConflicts);
      this.setRowConflicts();
    }
  },

  setRowConflicts: function(){
    var conflicts = this.get('rowConflicts'),
        boxes     = this.get('boxes');
    _.forEach(boxes, function(row, rowIdx){
      _.forEach(row, function(box, idx){
        var conflict = _.contains(conflicts, rowIdx);
        box.set('conflict', conflict);
      });
    });
  },

  checkColumns: function(){
    var values, value;
    var boxes = this.get('boxes');
    var oldColConflicts = this.get('colConflicts');
    var newColConflicts = [];
    for( var i = 0; i < boxes.length; i++){
      values = {};
      for( var j = 0; j < boxes.length; j++ ){
        value = boxes[j][i].get('value');
        if(values[value] === true){
          newColConflicts.push(i);
        } else if(value !== '') {
          values[value] = true;
        }
      }
    }
    if(!helpers.compareArrays(oldColConflicts, newColConflicts)){
      this.set('colConflicts', newColConflicts);
      this.setColumnConflicts();
    }
  },

  setColumnConflicts: function(){
    var conflicts = this.get('colConflicts'),
        boxes     = this.get('boxes');

    _.forEach(boxes, function(row, rowIdx){
      _.forEach(row, function(box, colIdx){
        var conflict = _.contains(conflicts, colIdx);
        box.set('conflict', conflict);
      });
    });
  },


  checkQuadrants: function(){
    var values, 
        value,
        conflict,
        oldConflicts = this.get('quadrantConflicts'),
        newConflicts = [],
        boxes     = this.get('boxes');

    var cb = function(box, x, y){
      value = box.get('value');
      if(values[value]){
        conflict = true;
      } else if (value !== ''){
        values[value] = true;
      }
    };

    for(var i = 0; i < boxes.length; i+=3){
      for(var j = 0; j < boxes.length; j+=3){
        values = {};
        conflict = false;
        this.iterateOverQuadrant(j, i, cb);
        if (conflict){
          newConflicts.push(Math.floor(i/3)*3+Math.floor(j/3));
        }
      }
    }

    if(!helpers.compareArrays(oldConflicts, newConflicts)){
      this.set('quadrantConflicts', newConflicts);
      this.setQuadrantConflicts();
    }
  },


  setQuadrantConflicts: function(){
    var conflicts = this.get('quadrantConflicts'),
        conflict,
        boxes = this.get('boxes');

    var cb = function(box, x, y){
      box.set('conflict', conflict);
    };

    for(var i = 0; i < boxes.length; i+=3){
      for(var j = 0; j < boxes.length; j+=3){
        conflict = _.contains(conflicts, Math.floor(i/3)*3+Math.floor(j/3));
        this.iterateOverQuadrant(j, i, cb);
      }
    }
  },

  iterateOverQuadrant: function(x, y, cb){
    var boxes = this.get('boxes');
    for ( var i = y; i < y+3; i++ ){
      for (var j = x; j< x+3; j++ ){
        cb(boxes[i][j], j, i);
      }
    }
  },

  board:  [[5, 3, 4, 6, 7, 8, 9, 1, 2], 
           [6, 7, 2, 1, 9, 5, 3, 4, 8], 
           [1, 9, 8, 3, 4, 2, 5, 6, 7],
           [8, 5, 9, 7, 6, 1, 4, 2, 3],
           [4, 2, 6, 8, 5, 3, 7, 9, 1], 
           [7, 1, 3, 9, 2, 4, 8, 5, 6], 
           [9, 6, 1, 5, 3, 7, 2, 8, 4], 
           [2, 8, 7, 4, 1, 9, 6, 3, 5], 
           [3, 4, 5, 2, 8, 6, 1, 7, 9]],

  newGame: function(num){
    var boxes = this.get('boxes'),
        range = _.shuffle(_.range(0, 81)),
        row,
        col;
    this.clearBoxes();
    for( var i = 0; i < num; i++ ){
      row = Math.floor(range[i]/9);
      col = range[i]-(row*9);
      boxes[row][col].set('value', this.board[row][col]);
      boxes[row][col].set('mutable', false);
    }
  },

  hasWon: function(){
    var numConflicts = 
      this.get('quadrantConflicts').length +
      this.get('rowConflicts').length +
      this.get('colConflicts').length;

    if(numConflicts){
      return false;
    }

    var complete = true;
    var boxes = this.get('boxes');
    _.forEach(boxes, function(row){
      _.forEach(row, function(box){
        var value = box.get('value');
        if (value === ''){
          complete = false;
        }
      });
    });

    if(complete){
      return true;
    }
    return false;
  },

  won: function(){
    this.trigger('won');
  },

  clearBoxes: function(){
    var boxes = this.get('boxes');
    _.forEach(boxes, function(row){
      _.forEach(row, function(box){
        box.set('value', '');
      });
    });
  }
});

module.exports = Grid;

