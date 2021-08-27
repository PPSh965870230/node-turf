## node-turf
使用node封装turf方法，通过接口调用turf计算空间分析，优化前端地图计算性能。

## 项目封装的 turfjs 版本为 5.1.6

## 依赖下载
```
npm install
```

## 运行
运行前将 server/server.js 的模式(mode)修改为 'development'。  
```
npm run start
```

## 打包需要安装环境 node (v14.16.0+)

## 打包
打包前将 server/server.js 的模式(mode)修改为 'pkg'。  
```
npm run pkgwin (winx64环境)
```  
```
npm run pkglinux (linux环境)
```

## 调试
全局安装调试工具:   
```
npm i -g --inspect-brk
```
调试指令:   
```
npm run debug
```
Chrome中进入debug  

## API文档查看
```
npm run doc-serve // 文档服务启动
```
```
npm run doc-build // 文档编译
```
http://127.0.0.1:9000/ 查看API文档。
