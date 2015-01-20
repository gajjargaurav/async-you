var async = require('async')
	, request = require('request');
var arr = ['one', 'two', 'three'];
async.reduce(arr, 0, function(memo, item, callback){
	var url = process.argv[2].toString().trim() + '?number=' + item;
	 request(url, function(err,response, body){
            if(err) callback(err);
            callback(null, memo + Number(body));
        });
},function(err, result){
  if (err) return console.log(err);
  console.log(result);
});