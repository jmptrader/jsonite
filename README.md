# jsonite
Json Expedited

Parsing json is so easy, until you need to move around more than a few meg.  If sanitization is done on your server, why
do you need to use a javascript parser to parse javascript object notation?  Why not let the browser's javascript engine
handle it?  Also, json that is big would be easier to load in parts rather than a huge chuck, jsonite does both.

Note: you should only use jsonite if you sanitize on your server.  Otherwise, DO NOT USE jsonite or ANY practice.  Also,
you are potentially storing malicious code, shame on you.

Many apps use json like this:
Note: Industry standard, slow
```javascript

$.getJSON('file.json', function(result) {
	var json = result[0];
	
	//proceed with instruction here
});
```

jsonite version (notice we just used javascript, no actual use of jsonite yet, it will come later):
```javascript

var json = [];
```
included as:
```html
<script src="file.json" async></script>
```
---


If you have more than one type of json:
Note: Industry standard, slow
```javascript

$.when($.getJSON('file1.json'), $.getJSON('file2.json')).then(function(result1, result2) {
	var json1 = result1[0],
		json2 = result[1];
	
	//proceed with instruction here
});
```

jsonite version (notice we just used javascript, no actual use of jsonite yet, it will come later):

```javascript

var json1 = [];
var json2 = [];
```
included as:
```html
<script src="file1.json" async></script>
<script src="file2.json" async></script>
```
---


What if you need to slice up your json so it can transfer asynchronously, and then reassemble when ready on the client?
Note: Industry standard, slow
```javascript

$.when($.getJSON('base.json'), $.getJSON('part1.json'), $.getJSON('part2.json')).then(function(result1, result2, result3) {
	var base = result1[0],
		part1 = result2[1],
		part2 = result3[2];
		
	base.parts = base.parts.concat(part1, part2);
	
	//proceed with instruction here
});
```

jsonite version (finally!)
NOTE: this is the initial file, which can load out of order
```
jsonite.init('user records', {parts:[]}, 2, function(base, part1, part2) {
	this.concat(base.parts, part1, part2);
	
	//proceed with instruction here
});
```
included as:
```html

<script src="base.json" async></script>
```

NOTE: this is not the initial file, but can still load out of order
```javascript

jsonite.insertPart('user records', 1, {});
```
included as:
```html

<script src="part1.json" async></script>
```

NOTE: this is not the initial file, but can still load out of order
```javascript

jsonite.insertPart('user records', 2, {});
```
included as:
```html
<script src="part2.json" async></script>
```