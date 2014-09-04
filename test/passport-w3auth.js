/**
 * New node file
 */
var should = require('chai').should(),
	w3auth = require('../index'),
	W3AuthStrategy = w3auth.W3AuthStrategy;
	
var api = 'https://w3auth.ciopaas1.innovate.ibm.com/v1/auth?profile=true',
	Strategy = new W3AuthStrategy(api);

var config = require('./config');

/*describe('#getPerson', function() {
	
	Strategy.getPerson(config.user, config.pw, function(err, response) {
		it('retrieves user information', function() {
			console.log(response);
		})
	});
})
*/

Strategy.getPerson(config.user, config.pw, function(err, response) {
	console.log(response);
});