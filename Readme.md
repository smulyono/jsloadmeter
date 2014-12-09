# JsloadMeter

> Load meter using PhantomJS

## Running through Nodejs / Javascript
```javascript
var instance = require(__dirname + "/../lib/jsloadmeter.js"); // load library
instance.loadMeter({
	url:"http://www.google.com",
	count : 5
}, function(err, stdout, stderr){
	expect(err).to.be.null;
	console.log(stdout);
	done();
});
```

## Running with phantomjs directly
```shell
phantomjs loadmeter.js -n 5 http://www.google.com
```

## Example Result
```shell
----------- JSLoadmeter v 1.0.0 ---------------
 Target url :  http://www.google.com
 Count      :  5
-----------------------------------------------
Starting......
-----------------------------------------------
Summary  http://www.google.com
-----------------------------------------------
Success Rate           :  100  %
Fail Rate              :  0  %
Average process time   :  153.8  msec
#Request / seconds     :  5
-----------------------------------------------
```
