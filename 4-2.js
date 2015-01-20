var wrapper = require('./httpwrapper')
  , async = require('async');
async.map (process.argv.slice(2),function(url,done){
    wrapper.get(url.toString().trim(), done);
  },
  function(err, results){
    if (err) console.log(err);
    console.log(results);
});