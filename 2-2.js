var request = require('request')
 	, async = require('async');
var getData = function(data) {
  return function (cb){
        request(data.toString().trimRight(), function(err,response, body){
            if(err) cb(err);
            cb(null, body);
        });
      }
    }
 async.series({
 	requestOne: getData(process.argv[2]),
 	requestTwo: getData(process.argv[3])
 }, function(err, result){
 	if (err) return console.error(err);
      console.log(result);
 });