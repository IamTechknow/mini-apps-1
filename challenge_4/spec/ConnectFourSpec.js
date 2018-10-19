var expect = require('chai').expect;
var ConnectFour = require('./ConnectFour.js');

const NONE = 0, RED = 1, BLACK = 2;

describe('', function() {
  var app;

  beforeEach(function() {
    app = new ConnectFour();
  });

  describe('Connect Four', function() {
    it('Should check for a win condition through a row', function() {
      app.addToCol(0);
      app.addToCol(4);
      app.addToCol(1);
      app.addToCol(4);
      app.addToCol(2);
      app.addToCol(4);
      app.addToCol(3);
      
      // Assert player one has won
      expect(app.winner).to.be.equal(RED);
    });

    it('Should check for a win condition through a column', function() {
      app.addToCol(0);
      app.addToCol(1);
      app.addToCol(0);
      app.addToCol(1);
      app.addToCol(0);
      app.addToCol(1);
      app.addToCol(0);
      
      // Assert player one has won
      expect(app.winner).to.be.equal(RED);
    });
    
    it('Should check for a win condition through a major diagonal', function() {
      app.addToCol(3);
      
      app.addToCol(2);
      app.addToCol(2);
      
      app.addToCol(1);
      app.addToCol(0);
      app.addToCol(1);
      app.addToCol(1);
      
      app.addToCol(0);
      app.addToCol(0);
      app.addToCol(1);
      app.addToCol(0);

      // Assert Player one has won
      expect(app.winner).to.be.equal(RED);
    });
    
    it('Should check for a win condition through a minor diagonal', function() {
      app.addToCol(0);
      
      app.addToCol(1);
      app.addToCol(1);
      
      app.addToCol(2);
      app.addToCol(2);
      app.addToCol(3);
      app.addToCol(2);
      
      app.addToCol(3);
      app.addToCol(0);
      app.addToCol(3);
      app.addToCol(3);
      
      // Assert Player one has won
      expect(app.winner).to.be.equal(RED);
    });

  });
});
