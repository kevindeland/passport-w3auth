W3 Authoritzation library
=========================

Used to authenticate using a w3 authorization API

## Installation

   npm install passport-w3auth --save

## Using Passport with Express


   app.js
   ```javascript 
   // Include in your dependencies list
   var passport = require('passport')
     , W3AuthStrategy = require('passport-w3auth').W3AuthStrategy;


   var config = require(__dirname + '/conf/config')
   var api = config.w3auth.url
   passport.use(new W3AuthStrategy());
   ```


   config/config.js
   ```javascript
   var config = {
       w3auth: {
       	       url: ${url}
       }
   }

   module.exports = {
       config: config
   };
   ```


## Using API

   Under construction