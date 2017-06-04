var http = require('http');
var fs = require('fs');
var path = require('path');
var io = require('socket.io')(http);

//varibles:
var hostname = 'localhost';
var port = 3000;
//var listener = io.listen(server);


var server = http.createServer(function(req,res){
	console.log('Request for ' + req.url + ' by method ' + req.method);
	

	if(req.method == 'GET'){
        io.sockets.on('connection', function(socket){
            //send data to client
            setInterval(function(){
                socket.emit('date', {'date': new Date()});
            }, 1000);
        });
		
		var fileUrl;

		if(req.url == '/')
			fileUrl = '/index.html';
		else
			fileUrl = req.url;

		var filePath = path.resolve('./public'+fileUrl);

		//var fileExt = path.extname(filePath);
        console.log(fileUrl);
		switch(fileUrl){
        case '/public/index.html':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('hello world');
            res.end();
            break;
        case '/public/socket.html':
            fs.readFile(__dirname + fileUrl, function(error, data){
                if (error){
                    res.writeHead(404);
                    res.write("xopps this doesn't exist - 404");
                    res.end();
                }
                else{
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data, "utf8");
                    res.end();
                }
            });
            break;
        default:
            res.writeHead(404);
            res.write("opps this doesn't exist - 404");
            res.end();
            break;
    	}
	}
	else if(req.method == 'PUT'){
		var fileUrl;

		if(req.url == '/')
			fileUrl = '/index.html';
		else
			fileUrl = req.url;

		var filePath = path.resolve('./public'+fileUrl);

		//var fileExt = path.extname(filePath);

		switch(filePath){
        case './public/index.html':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('hello world');
            res.end();
            break;
        case './public/socket.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    res.writeHead(404);
                    res.write("opps this doesn't exist - 404");
                    res.end();
                }
                else{
                    res.writeHead(200, {"Content-Type": "text/html"});
                    io.sockets.on('connection', function(socket){
                        //send data to client
                        setInterval(function(){
                            socket.emit('date', {'date': new Date()});
                        }, 1000);
                    });
                    res.write(data, "utf8");
                    res.end();
                }
            });
            break;
        default:
            res.writeHead(404);
            res.write("opps this doesn't exist - 404");
            res.end();
            break;
    	}
	}
	else{
		res.writeHead(404, { 'Content-Type': 'text/html' });
		res.end('<h1>Error 404: ' + req.method + ' not a GET request. Not supported!</h1>');
	}

});

server.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}/`);
});

/*var listener = */io.listen(server);
/*listener.sockets.on('connection', function(socket){
            setInterval(function(){
                console.log('hello world');
            }, 1000);
        });*/
