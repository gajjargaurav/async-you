var http = require('http')
    , async = require('async');
var urls = [process.argv[2], process.argv[3]];

  async.each (urls,function(url,done){
    http.get(url.toString().trim(),function(res){
       // res.resume(); or 
        res.on('data', function(chunk){
          });
    
          res.on('end', function(){
            done(); // or done(null);
          });

    }).on('error', function(err) {
        done(err);
      });
  },
  function(err){
    if (err) console.log(err);
  });