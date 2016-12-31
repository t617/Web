var fs = require("fs");
var url = require("url");
var http = require("http");
var querystring = require("querystring");

/* 判断url的request */
var requestHandle = function(request, response) {
	var err = {'message': ""};
	var user = {'username': "", 'id': "", 'tel': "", 'email': ""};
	if ((/username=/).test((url.parse(request.url)).query)) {
		var name = querystring.parse((url.parse(request.url)).query);
		if (checkRepeat(name, false, user).length != 0) {
			return loginpage(request, response, user);
		} else { //若不存在则返回错误信息提示
			err['message'] = "user\'" + name['username'] + "\' does not exist.";
			return errorpage(request, response, err);
		}
	}
	/* 提交表单之后执行的动作 */
	if (request.url == '/login' && request.method == 'POST') {
		var postdata = "";
		request.addListener("data", function(postchunk) {
      postdata += postchunk;
    });
    request.addListener("end", function() { // 监听end()的动作
      var qsdata = querystring.parse(postdata);
      if (checkLegality(qsdata, err)) {
        var repeatpart = checkRepeat(qsdata, true, user);
        if (repeatpart.length == 0) {
        	fs.appendFile('sql/user.txt', querystring.stringify(qsdata) + "\n", function(error) { //写入注册用户信息
        		if (error)
        			throw error;
        	});
        	return loginpage(request, response, qsdata);
        } else {
        	err['message'] = "your " + repeatpart + " \'" + qsdata[repeatpart] + "\' has been used by another user.";
        	return errorpage(request, response, err);
        }
      } else {
        return errorpage(request, response, err);
      }
    });
	}
	return signinpage(request, response); //返回注册成功后用户详情
}
/* 用户详情*/
var loginpage = function(request, response, user) {
	var pathname = url.parse(request.url).pathname;
	var ext = pathname.match(/(\.[^.]+|)$/)[0]; // 取得后缀名
	if (ext == ".css") {
		fs.readFile("." + "/css/" + request.url, 'utf-8', function (err, data) { // 读取内容
			if (err) throw err;
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(data);
			response.end();
		});
	} else {
		var html = "<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>User's Detail</title>\n\t\t<meta charset='utf-8' />\n\t\t"
		+ "<link rel='stylesheet' type='text/css' href='css/log.css' />"
		+ "\n\t</head>\n\t<body>\n\t\t<h1>User's detail</h1>\n\t\t" 
		+ "<div>Username：     " +  user['username'] + "</div>\t\t<div>StudentId：    " + user['id'] + "</div>\t\t"
		+ "<div>Telephone：" + user['tel'] + "</div>\t\t<div>Email：      " + user['email'] + "</div>"
		+ "</body></html>";
		response.writeHead(200, {"Content-Type": "text/html"});
		response.end(html); //返回一个html
	}
}
/* 注册界面 */
var signinpage = function(request, response) {
	if (request.url == "/favicon.ico" || request.method == 'POST') return;
	var pathname = url.parse(request.url).pathname;
	var ext = pathname.match(/(\.[^.]+|)$/)[0]; // 取得后缀名
	if (ext == ".css" || ext == ".js") {
		fs.readFile('./' + request.url, 'utf-8', function (err, data) { // 读取内容
			if (err) throw err;
			response.writeHead(200, {
				"Content-Type": {
				".css": "text/css",
				".js": "text/js",
				}[ext]
			});
			response.write(data);
			response.end();
		});
	} else {
		fs.readFile('sign.html', 'utf-8', function (err, data) { // 读取内容
			if (err) throw err;
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data);
			response.end();
		});
	}
}
var errorpage = function(request, response, err) {
	response.writeHead(404, {"Content-Type": "text/html"});
	response.end("<h1>Sorry," + err['message'] + "</h1></br>" + "<a href='/'>3秒后系统会自动跳转，也可点击本处直接跳</a>" + "<script>  function jumpurl(){ location='/';} setTimeout('jumpurl()',3000); </script>");
}

var checkLegality = function(data, err) { //提交后检测输入的信息的合法性
	var value = data['username'];
	if (/\W/.test(value) || /[a-zA-Z]\w{5,17}/.test(value) == false || value.length > 18 || /[a-zA-Z]/.test((value)[0]) == false) {
		err['message'] = "your username \'" + value + "\' is invalid.";
		return false;
	}
	value = data['id'];
	if (/\D/.test(value) || (value)[0] == '0' || /\d{8}/.test(value) == false || value.length > 8) {
		err['message'] = "your studentId \'" + value + "\' is invalid.";
		return false;
	}
	value = data['tel'];
	if (/\D/.test(value) || (value)[0] == '0' || /\d{11}/.test(value) == false || value.length > 11) {
		err['message'] = "your telephone \'" + value + "\' is invalid.";
		return false;
	}
	value = data['email'];
	if (/^[a-zA-Z_0-9\-]+@(([a-zA-Z_0-9\-])+\.)+[a-zA-Z]{2,4}$/.test(value) == false) {
		err['message'] = "your email \'" + value + "\' is invalid.";
		return false;
	}
	return true;
}
/* 检查用户信息是否被注册 */
var checkRepeat = function checkRepeat(data, flag, user) { 
	var fd = fs.openSync('sql/user.txt', 'a');
	var filedata = fs.readFileSync('sql/user.txt', 'utf-8'), repeat = "";
	var dataArr = filedata.split("\n"), qsarr = new Array(dataArr.length);
	for (var i = 0; i < dataArr.length; i++)
		qsarr[i] = querystring.parse(dataArr[i]);
	for (i = 0; i < qsarr.length; i++) {
		if (flag) {
			if (data['username'] == qsarr[i]['username'])
				return "username";
			if (data['id'] == qsarr[i]['id'])
				return "id";
			if (data['tel'] == qsarr[i]['tel'])
				return "tel";
			if (data['email'] == qsarr[i]['email'])
				return "email";
		} else {
			if (data['username'] == qsarr[i]['username']) {
				user['username'] = qsarr[i]['username'];
				user['tel'] = qsarr[i]['tel'];
				user['id'] = qsarr[i]['id'];
				user['email'] = qsarr[i]['email'];
				repeat = "username";
				break;
			}
		}
	}
	fs.close(fd, function(err) { //关闭文件
		if (err)
      throw err;
	});
	return repeat;
}
var server = http.createServer(requestHandle).listen(8000);
console.log("Server is listening at http://localhost:8000/");