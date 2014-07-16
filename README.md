[![Build Status](https://travis-ci.org/sumitchawla/asx-parser.svg?branch=master)](https://travis-ci.org/sumitchawla/asx-parser)

# ASX Parser

A simple utility to parse ASX (Advanced Stream Redirector) files. 
## Methods

### parseString
  Accepts ASX string for parsing
### parseFile
  Accepts ASX file for parsing

Both methods return an array of parsed entries/

```js

 [ 
  { 
    Title: 'Short Announcement to Play Before Main Stream',
    Url: 'http://example.com/announcement.wma' 
  },
  { 
    Title: 'Example radio',
    Url: 'http://example.com:8080',
    Author: 'Example.com' 
  } 
 ]

```
## Tests

Run tests using mocha

```js
  mocha test.js

```
