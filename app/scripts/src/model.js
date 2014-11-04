var eventMixin = require('./events.js');

var Model = function(data){
  this.data = data || {};
  eventMixin(this);
};

Model.prototype.set = function(key, val){
  this.data[key] = val;
  this.trigger('changed');
  this.trigger('changed:'+key);
};

Model.prototype.get = function(key){
  return this.data[key];
};

//allow for extension of model
Model.extend = function(config){
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