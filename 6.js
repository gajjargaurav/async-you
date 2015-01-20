var http = require('http')
	, wrapper = require('./httpwrapper')
	, async = require('async');
var arr = ['one', 'two', 'three'];
async.reduce(arr, 0, function(memo, item, callback){
	var url = process.argv[2].toString().trim() + '?number=' + item;
	var body = '';
	http.get(url.toString().trim(), function(res){
		res.on('data', function(chunk){
			body += chunk.toString();
		});
		res.on('end', function(chunk){
			callback(null, memo + Number(body));
		});
    }).on('error', function(err) {
      callback(err);
    });
},function(err, result){
  if (err) return console.log(err);
  console.log(result);
});