// Dependencies
var fs = require('fs');
var path = require('path');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var parser = require('./index.js')


function downloadFile(file_url, title, download_to)
{

	var mkdir = 'mkdir -p "' + download_to + '"';
	var child = exec(mkdir, function(err, stdout, stderr) {
	    if (err) throw err;
	    else download_file_httpget(file_url);
	});

        
	var download_file_httpget = function(file_url) {
	var options = {
	    host: url.parse(file_url).host,
	    port: 80,
	    path: url.parse(file_url).pathname
	};

	var file_name = url.parse(file_url).pathname.split('/').pop();
  	var ext = path.extname(file_name);
	var file = fs.createWriteStream('' + download_to + '/' + title + ext);

	http.get(options, function(res) {
	    res.on('data', function(data) {
		    file.write(data);
		}).on('end', function() {
		    file.end();
		    console.log(title + ' downloaded to ' + download_to);
		}).on('err', function(err){
		    console.log(title + ' error' + err);
		});
	    });
	};
}

 var dir = "config";
 fs.readdir(dir, function (err, files) {
     if (err) {
        throw err;
      }
      var data = [];
      files
      .forEach(function (file) {
        try {
                //console.log("processing ", file);
                file = dir + "/" + file;
                var isDirectory = fs.statSync(path.join(".",file)).isDirectory();
                if (!isDirectory) {
  		 var ext = path.extname(file);
                 if (ext != ".html") return;
		 parser.parseFile(file).done(function(ret) {
        	//	console.log(ret);
                        ret.forEach(function(r) {
			downloadFile(r.Url, r.Title, "downloads/" + r.Album);

			})
      		 });

                }

        } catch(e) {
          console.log(e); 
        }        
        
      });
  });
