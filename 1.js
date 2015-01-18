 var fs = require('fs')
  , http = require('http')
 	, async = require('async');
async.waterfall([
	function(cb){
    fs.readFile(process.argv[2], function(err, data){
      if(err){
        return cb(err);
      }
      cb(null, data);
    });
  },
  function(data, cb){
        var body = '';
        http.get(data.toString().trimRight(), function(res){
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
	], function(err, result){
      if (err) return console.error(err);
      console.log(result);
    });