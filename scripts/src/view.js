
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