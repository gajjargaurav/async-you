var request = require('request')
    , async = require('async');
async.map (process.argv.slice(2),function(data,cb){
    request(data.toString().trimRight(), function(err,response, body){
            if(err) cb(err);
            cb(null, body);
        });
  },
  function(err, results){
    if (err) console.log(err);
    console.log(results);
  });