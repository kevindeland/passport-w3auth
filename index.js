/**
 * New node file
 */
var W3AuthStrategy = require('./lib/passport-w3auth')
,	permissions = require('./lib/permissions')
,	BlueAuth = require('./lib/blue-auth');

exports.W3AuthStrategy = W3AuthStrategy;
exports.permissions = permissions;
exports.BlueAuth = BlueAuth;