var wrapper = require('./httpwrapper')
 	, async = require('async');
function getData (data){
  return function(done){
    wrapper.get(data.toString().trim(), done);
  }
}
async.series({
	requestOne: getData(process.argv[2]),
	requestTwo: getData(process.argv[3])
}, function(err, result){
	if (err) return console.error(err);
    console.log(result);
});