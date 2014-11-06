var View = require('./view.js'),
    Box  = require('./box.js');


var BoxView = View.extend({
  el: '<td class="sudoku-box">\
        <input class="sudoku-box-input" type="text"></input>\
      </td>',

  render: function(){
    var that = this;
    this.$el
    .find('input').val(this.model.get('value'))
    .on('input', function(){
      that.updateValue($(this).val());
    });

    if(this.model.get('conflict')){
      this.$el.addClass('conflict');
    } else {
      this.$el.removeClass('conflict');
    }

    return this.$el;
  },

  initialize: function(){
    this.model.on('changed', this.render, this);
  },

  updateValue: function(val){
    console.log('updating value of model to: ', val);
    this.model.set('value', val);
  }

});

module.exports = BoxView;