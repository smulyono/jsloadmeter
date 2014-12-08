/* jslint node:true */

var expect = require('chai').expect;

describe('LoadMeter Test Suite', function () {
	it('initialization test', function (done) {
		var instance = require(__dirname + "/../lib/jsloadmeter.js");
		instance.loadMeter({
			url:"http://www.google.com",
			count : 10
		}, function(err, stderr, stdin){
			console.log('err', err);
			console.log('stderr', stderr);
			console.log('stdin', stdin);
			done();
		});
	});
});