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