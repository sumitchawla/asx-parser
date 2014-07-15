var parser = require("./index.js");
var assert = require("chai").assert;

describe("Tests", function() {

    it('Test Example file', function(done){
      parser.parseFile("sample/example.asx").done(function(ret) {
        assert(ret);
        assert.isArray(ret);
        assert.equal(ret.length, 2);
        done();
      }); 
    })

    it('Test Malformed file', function(done){
      parser.parseFile("sample/malformed1.asx")
              .then(function(ret) { console.log(ret); })
              .caught(function(e) { done();}); ;      
    });
});
