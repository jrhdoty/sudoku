var BoxView = require('../app/scripts/src/boxView.js');
var Box     = require('../app/scripts/src/box.js');

describe('boxView', function(){
  var view, box, element;

  beforeEach(function(){
    box = new Box({value: 10});
    view = new BoxView({model: box});
  });

  it('should correctly render with data from model', function(){
    element = view.render();
    expect(element.html()).to.equal('10');
  });

  it('should correctly re-render when data from the model changes', function(){
    element = view.render();
    expect(element.html()).to.equal('10');
    box.set('value', 0);
    expect(element.html()).to.equal('0');
  });
});