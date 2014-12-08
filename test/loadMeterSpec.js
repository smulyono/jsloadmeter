/* jslint node:true */

var expect = require('chai').expect;

describe('LoadMeter Test Suite', function () {
	it('initialization test', function () {
		var instance = require(__dirname + "/../lib/loadMeter.js");
		instance.loadMeter({key:"value"});
		expect(true).to.be.ok;
	});
});