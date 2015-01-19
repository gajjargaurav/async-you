var http = require('http')
    , async = require('async');
var urls = process.argv.slice(2);

  async.map (urls,function(url,done){
    var body = '';
    http.get(url.toString().trim(),function(res){
        res.on('data', function(chunk){
            body += chunk.toString();
          });
    
          res.on('end', function(){
            return done(null, body);
          });
    }).on('error', function(err) {
        done(err);
      });
  },
  function(err, results){
    if (err) console.log(err);
    console.log(results);
  });