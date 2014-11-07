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