var basicAuth = require('basic-auth');
var request = require('request');

var auth = function(req, res, next) {
	function unauthorized(res) {
		res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
		return res.send(401);
	}
	
	var user = basicAuth(req);
	
	if(!user || !user.name || !user.pass) {
		return unauthorized(res);
	}
	
	
	// for now just make sure they're an IBMer
	// TODO check for BlueGroup status
	getPerson(user.name, user.pass, function(err, person) {
		if(err) {
			console.log('failed login');
			return unauthorized(res);
		}
		if(!person) {
			console.log('no person');
			return unauthorized(res);
		}
		else {
			return next();
		}
	});
	
	
	/*if (user.name === 'admin' && user.pass === 'cloudywithachance') {
		return next();
	} else if (user.name === 'superuser' && user.pass === 'spicy') {
		req.superuser = true;
		return next();
	} else {
		return unauthorized(res);
	}*/
}

function getPerson(email, password, callback) {
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
		url: 'https://w3auth.ciopaas1.innovate.ibm.com/v1/auth?profile=true', 
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

module.exports = auth;