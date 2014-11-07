(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./game.js":5,"./gameView.js":6}],2:[function(require,module,exports){
var View = require('./view.js'),
    Box  = require('./box.js');


var BoxView = View.extend({
  el: '<td class="sudoku-box">\
        <input class="sudoku-box-input" type="number" max=9 min=1 maxlength=1>\
        </input>\
      </td>',

  render: function(){
    this.$el
    .find('input').val(this.model.get('value'));

    if(this.model.get('conflict')){
      this.$el.addClass('conflict');
    } else {
      this.$el.removeClass('conflict');
    }

    if(!this.model.get('mutable')){
      this.$el.find('input').attr('readonly', 'readonly');
    } else {
      this.$el.find('input').removeAttr('readonly');
    }

    return this.$el;
  },

  initialize: function(){
    this.model.on('changed', this.render, this);

    //register events in initialize so that they 
    //aren't registered multiple times on calls to render
    var that = this;
    this.$el
    .find('input')
    .on('input', function(){
      that.updateValue($(this).val());
    });
  },

  updateValue: function(val){
    console.log('updating value of model to: ', val);
    this.model.set('value', val);
  }

});

module.exports = BoxView;
},{"./box.js":3,"./view.js":11}],3:[function(require,module,exports){
var Model = require('./model.js');

var Box = Model.extend({});

module.exports = Box;
},{"./model.js":10}],4:[function(require,module,exports){
'use strict';
var eventMixin = function(obj){

  obj.events = {};

  obj.on = function(event, fn, context){
    context = context || null;

    if ( this.events[event] ){ 
      this.events[event].push([fn, context]);
    } else {
      this.events[event] = [[fn, context]];
    }
  };

  obj.trigger = function(event){
    var args = Array.prototype.slice(arguments, 1);
    if( this.events[event] ){
      _.forEach(this.events[event], function(registered){
        registered[0].apply(registered[1], args);
      });
    }
  };

  obj.remove = function(event, fn){
    if (!this.events[event]){
      return;
    }
    _.remove(this.events[event], function(item){
      if(item[0] === fn){
        return true;
      }
      return false;
    });
  };
};

module.exports = eventMixin;
},{}],5:[function(require,module,exports){
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
},{"./grid.js":7,"./model.js":10}],6:[function(require,module,exports){
var Game = require('./game.js'),
    GridView = require('./gridView.js'),
    View = require('./view.js');

var GameView = View.extend({
  el: '<div class="game">\
        <button class="new-game" type="button">\
          New Game\
        </button>\
      </div>',

  render: function(){
    var grid = this.model.get('grid');
    console.log('grid is: ', grid);
    var gridView = new GridView({model:grid});

    this.$el.prepend(gridView.render());
    return this.$el;
  },

  initialize: function(){
    var that = this;
    this.$el.find('button').on('click', function(){
      that.reset();
    });
  },

  reset: function(){
    this.model.reset();
  }

});

module.exports = GameView;
},{"./game.js":5,"./gridView.js":8,"./view.js":11}],7:[function(require,module,exports){
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


},{"./box.js":3,"./helpers.js":9,"./model.js":10}],8:[function(require,module,exports){
var View    = require('./view.js'),
    Grid    = require('./grid.js');
    BoxView = require('./BoxView.js');

var GridView = View.extend({

  el: '<table class="sudoku-grid"></table>',

  render: function(){
    var dim   = this.model.get('dim');
    var boxes = this.model.get('boxes');

    this.$el.addClass('grid');
    this.$el.append(_.map(boxes, function(row, idx){
      return $('<tr class="sudoku-row">').append(_.map(row, function(box, idx){
        return new BoxView({model: box}).render();
      }));
    }));

    return this.$el;
  },

  initialize: function(){
  },

});

module.exports = GridView;
},{"./BoxView.js":2,"./grid.js":7,"./view.js":11}],9:[function(require,module,exports){
module.exports = {};

module.exports.compareArrays = function(array1, array2){
  if( array1.length !== array2.length )  return false;
  for (var i = 0; i < array1.length; i++){
    if(array1[i] !== array2[i]) return false;
  }
  return true;
};


},{}],10:[function(require,module,exports){
var eventMixin = require('./events.js');

var Model = function(data){
  this.data = data || {};
  eventMixin(this);
  this.initialize();
};

Model.prototype.set = function(key, val){
  this.data[key] = val;
  this.trigger('changed');
  this.trigger('changed:'+key);
};

Model.prototype.get = function(key){
  return this.data[key];
};

Model.prototype.initialize = function(){
  void 0;
};

//allow for extension of model
Model.extend = function(config){
  config = config || {};
  var that = this;

  //setup prototypal inheritence
  var model = function(data){
    that.call(this, data);
  };
  model.prototype = Object.create(this.prototype);
  model.prototype.constructor = this;
  _.extend(model.prototype, config);
  model.extend = this.extend;
  return model;
};

module.exports = Model;
},{"./events.js":4}],11:[function(require,module,exports){

var View = function(options){
  if ( options.model ) {
    this.model = options.model;
  } else{
    this.collection = options.collection;
  }
  this.$el = $(this.el);
  this.initialize();
};


View.prototype.render = function(){
  void 0;
};

View.prototype.initialize = function(){
  void 0;
};

View.extend = function(config){
  config = config || {};
  var that = this;

  var view = function(options){
    that.call(this, options);
  };


  view.prototype = Object.create(this.prototype);
  view.prototype.constructor = this;
  _.extend(view.prototype, config);
  view.extend = this.extend;

  if( !view.el ){
    view.el = '<div></div>';
  }

  return view;
};

module.exports = View;
},{}]},{},[1]);
