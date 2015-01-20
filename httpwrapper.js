var http = require('http');
function post (options, data, callback) {
		 	var req = http.request(options, function(res) {
		 		var body = '';
				res.setEncoding('utf8');
				res.on('data', function (chunk) {
						body += chunk.toString();
				});
				res.on('end', function(chunk){
						callback(null, body);
				});
			});
			req.on('error', function(e) {
			  callback(e);
			});

			req.write(data);
			req.end();
		 }

function get (url,callback){
			var body = '';
			http.get(url.toString().trim(), function(res){
				res.on('data', function(chunk){
					body += chunk.toString();
				});
				res.on('end', function(chunk){
					callback(null, body);
				});
		    }).on('error', function(err) {
		      callback(err);
		    });
		}
module.exports.post = post;
module.exports.get = get;
