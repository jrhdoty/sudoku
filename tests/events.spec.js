var eventMixin = require('../app/scripts/src/events.js');

describe('eventMixin', function(){
  var obj, state, cb;

  beforeEach(function(){
    obj = {};
    eventMixin(obj);
    cb = function(){
      state = true;
    };

    obj.on('changed', cb);

    state = false;
  });

  it('extended objects should have additional keys', function(){
    expect(typeof obj.on).to.equal('function');
    expect(typeof obj.remove).to.equal('function');
    expect(typeof obj.events).to.equal('object');
  });

  it('should trigger registered callbacks on an event', function(){
    expect(state).to.equal(false);
    obj.trigger('changed');
    expect(state).to.equal(true);
  });

  it('should remove registered callbacks', function(){
    expect(state).to.equal(false);
    obj.remove('changed', cb);
    obj.trigger('changed');
    expect(state).to.equal(false);
  });
});
