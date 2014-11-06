var View = require('./view.js'),
    Box  = require('./box.js');


var BoxView = View.extend({
  el: '<div></div>',

  render: function(){
    return this.$el.html(this.model.get('value'));
  },

  initialize: function(){
    this.model.on('changed', this.render, this);
  }

});

module.exports = BoxView;