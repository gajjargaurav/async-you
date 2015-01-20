 var fs = require('fs')
  , wrapper = require('./httpwrapper')
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
        wrapper.get(data.toString().trimRight(), cb);
      }
	], function(err, result){
      if (err) return console.error(err);
      console.log(result);
    });