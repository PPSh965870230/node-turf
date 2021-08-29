/*********必要配置*********/
const mode = 'development'; // 运行模式，打包(pkg)、开发(development)
/*******必要配置结束*******/

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const process = require('process');
const router = require('./api/router');

let mime = {};
// 加载配置文件，启动服务
try {
    const mime_buffer = mode === 'pkg' ? fs.readFileSync(path.join(process.execPath, '../conf/', 'mime.json')) : fs.readFileSync(path.join(__dirname, './conf/', 'mime.json'));
    mime = JSON.parse(mime_buffer.toString());
} catch (e) {
    console.log(e);
}
try {
    // 根据模式设置加载配置文件
    const config_buffer = mode === 'pkg' ? fs.readFileSync(path.join(process.execPath, '../conf/', 'config.json')) : fs.readFileSync(path.join(__dirname, './conf/', 'config.json'));
    const config = JSON.parse(config_buffer.toString());

    // 启动服务
    const server = http.createServer((req, res) => {
        let pathname = decodeURI(url.parse(req.url).pathname);
        // 路由处理
        if (pathname === '/') pathname = '/index.html';
        if (router[pathname.slice(1)]) {
            let authPass = methodAuth(req, res);
            if (authPass) {
                router[pathname.slice(1)](req, res);
            }
        } else {
            staticFile(req, res, pathname.slice(1));
        }
    });

    server.listen(config.port || 8080);
    console.log(`服务已启动: http://127.0.0.1:${config.port || 8080}`);
} catch (e) {
    console.error(e);
}

// 请求方法鉴别
let methodAuth = (req, res) => {
    let method = req.method;
    if (method !== 'POST') {
        res.writeHead(400, {
            'Access-Control-Allow-Origin': '*', // 跨域
            'Content-Type': 'text/html;charset=utf-8', //中文乱码
        });
        res.end();
        return false;
    }
    return true;
}

// 返回静态文件
let staticFile = ((req, res, pathname) => {
    let postfix = pathname.match(/(\.[^.]+|)$/)[0]; //取得后缀名
    let indexPath = mode === 'pkg' ? path.join(process.execPath, '../web', pathname) : path.join(__dirname, '../www/web', pathname);
    fs.readFile(indexPath, (e, data) => {
        if (e) {
            res.writeHead(404, {
                'Access-Control-Allow-Origin': '*', // 跨域
            });
            res.end();
        }


        if (mime[postfix]) {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', // 跨域
                'Content-Type': mime[postfix],
            });
        }

        res.end(data);
    });
})
