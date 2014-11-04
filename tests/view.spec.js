var View  = require('../app/scripts/src/view.js');
var Model = require('../app/scripts/src/model.js');

describe('View Class', function(){
  var ItemView, itemView, Item, item;

  beforeEach(function(){
    Item = Model.extend({
      update: function(){
        this.trigger('update');
      }
    });

    item = new Item({value: 'hello world'});

    ItemView =  View.extend({
      el: '<p></p>',

      render: function(){
        return this.$el.html(this.model.get('value'));
      }, 

      initialize: function(){
        var that = this;
        this.model.on('changed', function(){
          that.render();
        });
      }

    });

    itemView = new ItemView({model: item});
  });

  it('should initialize a new view correctly', function(){
    expect(itemView.el).to.equal('<p></p>');
    expect(itemView.model).to.equal(item);
  });

  it('should correctly render view with model data', function(){
    var element = itemView.render();
    expect(element.html()).to.equal('hello world');
  });

  it('should correctly register listeners to change on model data', function(){
    var element = itemView.render();
    expect(element.html()).to.equal('hello world');
    item.set('value', 'hello moto');
    expect(element.html()).to.equal('hello moto');

  });
});