var BoxView = require('../app/scripts/src/boxView.js');
var Box     = require('../app/scripts/src/box.js');

describe('boxView', function(){
  var view, box, elem;

  beforeEach(function(){
    box = new Box({value: 10});
    view = new BoxView({model: box});
    elem = view.render();
  });

  it('should correctly render with data from model', function(){
    expect(elem.find('input').val()).to.equal('10');
  });

  it('should correctly re-render when data from the model changes', function(){
    expect(elem.find('input').val()).to.equal('10');
    box.set('value', 0);
    expect(elem.find('input').val()).to.equal('0');
  });

  it('should correctly add "conflict" class if conflict attribute is true', function(){
    box.set('conflict', true);
    expect(elem.attr('class').split(/\s+/).indexOf('conflict')).to.not.equal(-1);
  });
});