var basicAuth = require('basic-auth');
var request = require('request');

/**
 * builds an authentication function based on config parameters 
 */
var buildAuth = function(config) {
	
	var getPerson = buildGetPerson(config.api);
	
	return function(req, res, next) {
		function unauthorized(res) {
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
			return res.send(401);
		}

		var user = basicAuth(req);

		if(!user || !user.name || !user.pass) {
			return unauthorized(res);
		}

		getPerson(user.name, user.pass, function(err, person) {
			if(err) {
				console.log('failed login');
				return unauthorized(res);
			}
			if(!person) {
				console.log('no person');
				return unauthorized(res);
			}

			var groups = JSON.parse(person).groups;

			// check for group membership
			if(groups.indexOf(config.superuser) > -1) {
				req.superuser = true;
				return next();
			} else if (groups.indexOf(config.admin) > -1) {
				return next();
			} else {
				return unauthorized(res);
			}
		});
	}
};
		
var buildGetPerson = function(api) {
	return function (email, password, callback) {
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
			url: api,
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(params),
			strictSSL: false
		}, function(error, response, body) {
			console.log('response');
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
}

module.exports = {
		buildAuth: buildAuth
}