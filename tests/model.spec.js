var Model = require('../app/scripts/src/model');

describe('Model', function(){
  var Item, config, state;

  beforeEach(function(){
    state = false;

    config = {
      move: function(){
        this.trigger('move', this);
      }
    };

    Item = Model.extend(config);
  });

  it('should be able to create an item with some data', function(){
    var item = new Item({value: 10});
    expect(item.get('value')).to.equal(10);
  });

  it('should correctly trigger events and update data on model.set', function(){
    var item = new Item({value: 10});
    item.on('change', function(){
      state = !state;
    });
    expect(state).to.equal(false);
    item.set('value', 5);
    expect(state).to.equal(false);
    expect(item.get('value')).to.equal(5);
  });

  describe('Additional extension of Model', function(){
    var SpecialItem;

    beforeEach(function(){
      SpecialItem = Item.extend({
        specialFunc : function(){
          return 'special';
        }
      });
    });

    it('should allow for further extension of models', function(){
      var special = new SpecialItem();
      special.on('move', function(){
        state = true;
      });

      expect(special.specialFunc()).to.equal('special');
      expect(state).to.equal(false);
      special.move();
      expect(state).to.equal(true);
    });
  });
});