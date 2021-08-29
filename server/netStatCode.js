/**
 * 通用网络返回状态码
 */

const headSet = {
    'Access-Control-Allow-Origin': '*', // 跨域
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,POST',
    'Content-Type': 'application/json;charset=utf-8', //中文乱码
};

// 请求成功通用头 200
let commonResHead_200 = (res, endMsg) => {
    res.writeHead(200, headSet);
    res.end(endMsg);
};

// 请求 404
let commonResHead_404 = (res, endMsg) => {
    res.writeHead(404, headSet);
    res.end(endMsg);
};

// 请求 500
let commonResHead_500 = (res, endMsg) => {
    res.writeHead(500, headSet);
    res.end(endMsg);
};

module.exports = {
    commonResHead_200,
    commonResHead_404,
    commonResHead_500
};