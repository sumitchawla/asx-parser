var parser = require("./index.js");
var assert = require("assert");

describe("Tests", function() {

    it('Test Example file', function(done){
      parser.parseFile("sample/example2.asx").done(function(ret) {
        //console.log(ret);      
        done();
      }); 
    })
});
