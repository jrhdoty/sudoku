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