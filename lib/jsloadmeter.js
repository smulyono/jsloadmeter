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

/* jslint node:true */
'use strict';
var phantom = require('phantomjs'),
	child_process = require("child_process");


function parseOptions(options){
	var defaultOptions =  {
		count : 1,
		concurrent : 1
	};
	// check for all important options
	// {
	// 		count : N, // number of repetitions this test being executed
	// 		concurrent: N, // number of concurrent connection being simulated
	// }
	if ("undefined" !== typeof options && !options.hasOwnProperty("count")){
		options.count = defaultOptions.count;
	} 
	if ("undefined" !== typeof options && !options.hasOwnProperty("concurrent")){
		options.concurrent = defaultOptions.concurrent;
	}
	return options;
};

/**
 * Main functionality which is nodejs wrapper script
 * to run child processes of phantomjs
 * @param {[type]} options [description]
 */
module.exports.loadMeter = function(options, callback){
	options = parseOptions(options);
	if (!options.hasOwnProperty("url") || "undefined" === typeof options.url){
		console.error("No target url, please specify target URL to continue.....");
		return null;
	}
	// prepare phantomjs executable arguments
	var childArgs = [
		__dirname + '/loadmeter.js', 	// phantomjs  script
		"-n " + options.count,					// count
		"-c " + options.concurrent,				// concurrent request
		options.url 							// URL Link
	];
	child_process.execFile(phantom.path, childArgs, {
		cwd : __dirname,
		encoding:'utf8'
	}, function(err, stderr, stdin){
		// receiving output back
		if (typeof callback === "function"){
			callback(err, stderr, stdin);
		}
	});
	return process;
};