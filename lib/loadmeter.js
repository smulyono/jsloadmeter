/**
    Copyright 2014 Sanny Mulyono

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
**/
/**
 * Phantomjs script to test load connection
 *
 * How to run :
 * 	$ phantomjs loadmeter.js -n 10 http://www.google.com
 *
 *
 * @author smulyono<smulyono@me.com>
 */
/* jslint node:false */

var page = require('webpage').create(),
	system = require('system')
	args = system.args,
	totalRequestTime = 0,
	stats = {
		success : [],
		fail : [],
		perSecondRequest : 0,
	};

function calculatesummary(url){
	// prepare data
	var successRate = failRate = averageProcessTime = requestpersec = 0;
	// Success Rate (n / N)
	// Fail Rate (n / N)
	var TotalN = stats.success.length + stats.fail.length;
	
	successRate = Math.round((stats.success.length / TotalN) * 100);
	failRate = Math.round((stats.fail.length / TotalN) * 100);

	// Average process time
	var totalProcessTime = 0;
	for (var idx in stats.success){
		// get each request and calculate the average time (in msec)
		var obj = stats.success[idx];
		if (obj.hasOwnProperty("time") && obj.time !== "undefined"){
			totalProcessTime += obj.time;
		}
	}
	averageProcessTime = totalProcessTime / TotalN;

	// Get number of request / seconds, 

	console.log('-----------------------------------------------');
	console.log('Summary ', url);
	console.log('-----------------------------------------------');
	console.log('Success Rate           : ', successRate, ' %');
	console.log('Fail Rate              : ', failRate , ' %');
	console.log('Average process time   : ', averageProcessTime , ' msec');
	console.log('#Request / seconds     : ', stats.perSecondRequest);
	console.log('-----------------------------------------------');	
	phantom.exit();
}

function startStressTest(url , n, i){
	if (i > 0){
		openPage(url, n , i)
	} else {
		calculatesummary(url);
	}
}

function openPage(url, n, i){
	var timeStart = Date.now();
	// Default 
	var result = {
		sucess : false,
		time : 0
	};
	page.open(url , function(status){
		var timeEnd = Date.now() - timeStart;
		if (status !== 'success'){
			stats.fail.push({
				counter : i,
				"time" : timeEnd
			})
		} else {
			stats.success.push({
				"counter" : i,
				"time" : timeEnd
			});
		}
		// overall request (used in #request/second)
		if (totalRequestTime < 1000){
			stats.perSecondRequest ++;
			totalRequestTime += timeEnd;
		}


		if ((i % 100) == 0) {
			console.log("Finish 100 request");
		}
		window.setTimeout(function(){
			startStressTest(url, n, i - 1);
		}, 1);
	});
}

// parse the options
if (args.length <= 2 ){
	console.error('Not enough information, please pass more arguments (e.g url )');
} else {
	var loadmeterOpts = {
		n : 1,
		url : ""
	};
	var modearr = [];
	args.forEach(function(arg, i){
		if (i > 0 && "string" === typeof arg){ // first index should be the path to the script
			// parse each arguments encountered
			switch (arg) {
				case '-n' : 
					modearr.push('n');
				break;
				default : 
					if (modearr.length > 0){
						loadmeterOpts[modearr.pop()] = arg;
					} else {
						loadmeterOpts.url = arg;
					}
				break;
			}
		}
	});
	// starting
	console.log('----------- JSLoadmeter v 1.0.0 ---------------');
	console.log(' Target url : ', loadmeterOpts.url);
	console.log(' Count      : ', loadmeterOpts.n);
	console.log('-----------------------------------------------');
	console.log('Starting......');
	startStressTest(
		loadmeterOpts.url, 
		loadmeterOpts.n, 
		loadmeterOpts.n)
}
