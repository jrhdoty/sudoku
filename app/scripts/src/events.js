'use strict';
var eventMixin = function(obj){

  obj.events = {};

  obj.on = function(event, fn){
    if ( this.events[event] ){ 
      this.events[event].push(fn);
    } else {
      this.events[event] = [fn];
    }
  };

  obj.trigger = function(event, context){
    if( this.events[event] ){
      _.forEach(this.events[event], function(fn){
        fn.call(context||null);
      });
    }
  };

  obj.remove = function(event, fn){
    if (!this.events[event] || this.events[event].indexOf(fn) === -1){
      return;
    }
    this.events[event].splice(this.events[event].indexOf(fn), 1);
  };

};

module.exports = eventMixin;