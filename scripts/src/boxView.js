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