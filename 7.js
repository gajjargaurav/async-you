var async = require('async')
	, request = require('request');

var url = process.argv[2].toString().trim();
var count = 0;
var resultBody = '';
async.whilst(
    function () { 
    	return resultBody.trim() !== 'meerkat';
    },
    function (callback){
        count++;
     	request(url, function(err,response, body){
          resultBody =  body;
          callback();
        });
    },
    function (err) {
    	if(err) console.log(err);
        console.log(count);
    }
);