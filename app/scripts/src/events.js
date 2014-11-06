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