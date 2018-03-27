var PORT = 3000;//

var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;//
var path=require('path');
var hostUrl="Users/ruanxiang/study/node/"

var server = http.createServer(function (request, response) {
    console.log(request)
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join("http.js", pathname);    //这里设置自己的文件名称;
    // var realPath = path.join(pathname);    //这里设置自己的文件名称;
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain;charset="utf-8"'
            });
            // console.log(exists);
            response.write('</br>');

            response.write("404错误</h1><p>你要找的页面不存在");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");