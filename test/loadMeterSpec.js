/* jslint node:true */

var expect = require('chai').expect;

describe('LoadMeter Test Suite', function () {
	it('initialization test', function (done) {
		var instance = require(__dirname + "/../lib/jsloadmeter.js");
		instance.loadMeter({
			url:"http://www.google.com",
			count : 5
		}, function(err, stdout, stderr){
			expect(err).to.be.null;
			console.log(stdout);
			done();
		});
	});
});