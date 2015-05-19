
var http = require("http");
var path = require("path");
var fs =require("fs");
var server = http.createServer(function(req, res){
	
	var resource = req.url;
	var ext = path.extname(resource);
	var contentType = "";
	
	
	if(resource === "/"){
		resource = "index.html";
	}
	resource = "." + resource;
	switch(ext){
	
	case ".css":
		contentType = "text/css";
		break;
		
	case ".js":
		contentType = "text/javascript";
		break;
	}
	
	fs.exists(resource,function(exist){
		if(exist){
			fs.readFile(resource, function(err, data){
				if(err){
					res.writeHead(500);
					res.end("Internal Error");
				}else{
					res.writeHead(200,{"content-type":contentType});
					res.end(data);
				}
			});
			
		}else{
			res.writeHead(404);
			res.end("Not Found");
		}
	});
	
	/*res.writeHeader(200,{"content-type":"text/html"});
	res.end("<h1>Fin de la peticion</h1>");*/
	
});
server.listen(8888);
console.log("server running...");

