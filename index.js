'use strict';
var Promise = require("bluebird");
var expat = require('node-expat');
var fs = Promise.promisifyAll(require("fs"));

var AsxParser = function() {
        var trim = function(text) {
          return (text || '').replace(/(^\s*|\s*$)/g, function(match, group) { return ''; })
        }

       var toUpper = function(text) {
          return (text || '').replace(/^([a-z]?)/,function(c) { return c.toUpperCase(); });
        }

        this.parseFile = function(file){

          var resolver = Promise.pending();

          fs.readFileAsync(file)
            .then(function(data){
            var entries = [];
            var currentEntry = null;
            var currentProp = null;        
                    
            var parser = new expat.Parser('UTF-8');
            parser.on('startElement', function (name, attrs) {
              //console.log("start", name, attrs)
              name = name.toLowerCase();
              switch(name) {
                case 'entry': 
                  currentEntry = {};
                  break;
                case 'title':
                case 'author':
                  currentProp = name;
                  break;
                case 'ref':
                  if (currentEntry && attrs) {
                    currentEntry.Url = attrs.href;
                  }
                  break;
                case 'param':
                  if (currentEntry && attrs && attrs.Name && attrs.Value) {
                    switch(attrs.Name.toLowerCase()) {
                      case 'wm/albumtitle':
                      case 'albumtitle':
                        currentEntry.Album = trim(attrs.Value);
                        break;
                      case 'wm/genre':
                      case 'genre':
                        currentEntry.Genre = trim(attrs.Value);
                        break;
                    }
                  }
                  break;
              }
            });

            parser.on('endElement', function (name) {
              //console.log("end",name)
              name = name.toLowerCase();
              if (currentProp && (name != currentProp)) {
                console.log('unmatched', name, currentProp);
                throw new Error('Unmatched End tag.' + name);
              }
              switch(name) {
                case 'entry': 
                  entries.push(currentEntry);
                  currentEntry = null;
                  currentProp = null;
                  break;
                case 'title':
                case 'author':
                  currentProp = null;
                  break;
                case 'ref':
                  break;
              }
            });

            parser.on('text', function (text) {
              //console.log("text",text);
              switch(currentProp) {
                case 'title':
                case 'author':
                  var prop = toUpper(currentProp);
                  if (currentEntry) currentEntry[prop] = trim(text); 
                  break;
                case 'ref':
                  break;
              }
            })

            parser.on('error', function (error) {
              console.error(error)
            });
                  
            if (!parser.parse(data)) {
              resolver.reject(new Error('There are errors in your xml file: ' + parser.getError()));
            }
             resolver.resolve(entries);
          });

          return resolver.promise;;
        }
};

module.exports = new AsxParser(); 
