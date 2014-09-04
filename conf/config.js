var config = {
		termsVersion: "1.0",
		
		testMode: true,
		// email address of IBMer to impersonate, or null for normal operation
		testUsername: null,
		
		// email constants
		email: {
			sendToTester: true,
			testerEmail: 'leeanni@us.ibm.com',
			testSubject: '[TEST EMAIL] ',
			bccRecipients: [ 'kmdeland@us.ibm.com', 'leeanni@us.ibm.com' ],
			host: 'na.relay.ibm.com',
			from: 'CIO BlueMix Onboarding <ciopaas@us.ibm.com>'
		},
		
		// bluegroup constants
		bluegroup: {
			url: "https://bluepages.ibm.com/tools/groups/groupsxml.wss?",
			creatorGroup: 'CIOPAASDEV'
		},
		
		// EPMS service constants
		epms: {
			auth: "Basic " + new Buffer("admin:cloud4youAndM3").toString("base64"),
			baseUrl: "https://epmsservices.ciopaas1.innovate.ibm.com/epms/api/v1"
			//baseUrl: "http://localhost:9080/epms/api/v1"
		},
		
		// Bluepages LDAP constants
		bluepages: {
			url: 'ldap://bluepages.ibm.com:389',
			base: 'o=ibm.com,ou=bluepages',
			filter: 'ou=bluepages,o=ibm.com',
			debug: true
		}, 
		
		// session constants
		session: {
			secret: 'C1oL4bIc5Rd3Jbch4t',
			// expiration in milliseconds
			cookieMaxAge: 12*60*60*1000
		}
		
		
};

module.exports = {
		config: config
};
