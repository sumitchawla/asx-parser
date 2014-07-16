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
    });

    it('Test Malformed file', function(done){
      parser.parseFile("sample/malformed1.asx")
              .then(function(ret) { console.log(ret); })
              .caught(function(e) { done();}); ;      
    });


    it('Test ASX content', function(done){
      parser.parseString('<asx version="3.0"><title>Example.com Live Stream</title><entry><title>Short Announcement to Play Before Main Stream</title><ref href="http://example.com/announcement.wma" /><param name="aParameterName" value="aParameterValue" /></entry><entry><title>Example radio</title><ref href="http://example.com:8080" /><author>Example.com</author><copyright>©2005 Example.com</copyright></entry></asx>')
      .done(function(ret) {
        assert(ret);
        assert.isArray(ret);
        assert.equal(ret.length, 2);
        done();
      }); 
    });

});
