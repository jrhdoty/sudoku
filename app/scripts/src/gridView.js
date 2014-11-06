var View    = require('./view.js'),
    Grid    = require('./grid.js');
    BoxView = require('./BoxView.js');

var GridView = View.extend({

  el: '<table></table>',

  render: function(){
    var dim   = this.model.get('dim');
    var boxes = this.model.get('boxes');

    this.$el.addClass('grid');
    return this.$el.append(_.map(boxes, function(row, idx){
      return $('<tr>').append(_.map(row, function(box, idx){
        return new BoxView({model: box}).render();
      }));
    }));
  },

  initialize: function(){
    this.model.on('changed', this.render, this);
  }

});

module.exports = GridView;