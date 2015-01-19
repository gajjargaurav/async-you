var http = require('http')
 	, async = require('async');
var getData = function(data) {
  return function (cb){
        var body = '';
        http.get(data.toString(), function(res){
          res.on('data', function(chunk){
            body += chunk.toString();
          });

          res.on('end', function(chunk){
            cb(null, body);
          });
        }).on('error', function(err) {
          cb(err);
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