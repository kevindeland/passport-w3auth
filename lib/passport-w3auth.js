/**
 * New node file
 */
var passport = require('passport');
var util = require('util');
var ldap = require('ldapjs');
var request = require("request");

function Strategy(api) {
	passport.Strategy.call(this);
	
	this.name = 'ldap';
	this.api = api;

	this._verify = function(person,done){
		//should return a user
		console.log("In verify: " + person);
		done(null, this.processResponse(person));
	}
	
	// this is a replacement  of User.getFromAuthService
	this.processResponse = function(personString) {
		console.log("in processResponse");
		var person = eval("(" + personString + ")");
		console.log('the person ' + person);
		// deal with "serialNumber" vs. "serialnumber"
		var serial = person.userId;
		if (!serial) {
			serial = person.userId;
			if (!serial) {
				serial = person.userId;
			}
		}
		console.log(person.profile);
		var profileData = person.profile.data;
		// deal with dual intranet addresses
		var username = person.userId;
		
		// deal with callupName vs. callupname
		var callup = profileData.callupname[0];
		console.log('callup test: ' + callup);
		
		var newuser =  {
				username:username,
				allEmails:username,
				provider:"ldap",
				id: username,
				displayName: callup,
				firstName: username,
				lastName: username			
			};
		
		console.log('new user: ' + newuser.id);
		
		return newuser;
	}
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function(req, options) {
	var self = this;
	console.log("authentication attempt on: "+ req);
	console.log(req.body);
	console.log("authentication attempt on: "+ req.body.username);
	// if no username field, get it from the email field
	if(!req.body.username && req.body.email) {
		req.body.username = req.body.email;
	}
	if (!req.body.username || !req.body.password) {
        return self.fail(401);
    }
	
	
	
	self.getPerson(req.body.username,req.body.password,function(err,person){
		console.log('person: ' + person);
		if(!person) {
			console.log("No person " + req.body.username);
			console.log("err:");
			console.log(err);
			return self.fail(403);
		}
		
		if(err) {
			// TODO: save failed login attempt event
			console.log('Failed Login! ' + req.body.username);
			return self.fail(403);
		}
		self._verify(person,function(err,user){
			
			if(err){
				return self.error(err);
			}
			if (!user) {
				return self.fail(self._challenge());
			} 
			console.log('user is ' + user);
			self.success(user);
		});
		//now what?
		
	});
}

Strategy.prototype.getPerson = function(email, password, callback) {
	console.log('Getting person w/ email ' + email);
	console.log('calling getPerson');
	var self = this;
	var params = {
			userId:  email,
			password: password	
		};
	//this appears to be the magic part, what about password?
	//handled in a differnt place, interestgin
	console.log(params);
	request.post({
		url: self.api, 
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(params),
		strictSSL: false
	}, function(error, response, body) {
		console.log("status code: " + response.statusCode);
		if(200 != response.statusCode){
			console.log("An error bad password/userid");
			callback(new Error('User Not Found'));
		}
		else if (error) {
			
		} else {
			callback(null, body);
		}
	});
	
	
	
	
	
	
}


module.exports = Strategy;
