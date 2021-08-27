const helpers = require('@turf/helpers');
const cp = require('child_process');
const EventEmitter = require('events');
const numCPUs = require('os').cpus().length;
const minProcessNum = 200; // 线程最小处理数据数量
const maxProcessNum = 320; // 线程最大处理数据数量

/**
 * 创建 Feature 要素
 */
let feature = (argument) => {
    return helpers.feature(argument.geometry, argument.properties || {}, argument.options);
};

/**
 * 创建 FeatureCollection 要素集合
 */
let featureCollection = (argument) => {
    return helpers.featureCollection(argument.features, argument.options);
};

/**
 * 创建 Geometry 图元
 */
let geometry = (argument) => {
    return helpers.geometry(argument.type, argument.coordinates);
};

/**
 * 创建 GeometryCollection 图元集合
 */
let geometryCollection = (argument) => {
    return helpers.geometryCollection(argument.geometries, argument.properties, argument.options);
};

/**
 * 创建 Point 要素
 */
let point = (argument) => {
    return helpers.point(argument.coordinates, argument.properties || {}, argument.options);
};

/**
 * 创建 PointCollection 要素集合
 */
let pointCollection = (argumentList) => {
    let threadProcessNum = Math.min(maxProcessNum, Math.max(Math.ceil(argumentList.length / numCPUs), minProcessNum));
    return new Promise((resolve) => {
        if (argumentList.length === 0) {
            resolve(helpers.featureCollection([]));
        } else if (argumentList.length <= threadProcessNum) {
            let list = [];
            for (let argument of argumentList.values()) {
                list.push(helpers.point(argument.coordinates, argument.properties, argument.options));
            }
            resolve(helpers.featureCollection(list));
        } else {
            // 多线程大量计算
            let childFeatures = []; // 子线程计算数据
            let mainThreadFeatures = []; // 主线程计算数据
            let cpNum = Math.floor(argumentList.length / threadProcessNum); // 分发的子线程数量
            let cpSucessNum = 0; // 子线程完成计算的数量
            let childProcessEvent = new EventEmitter();
            // 子线程计算完成触发事件
            childProcessEvent.on('child_process_overed', (data) => {
                cpSucessNum++;

                childFeatures = childFeatures.concat(data);

                if (cpSucessNum === cpNum) {
                    childProcessEvent.emit('all_child_process_overed');
                }
            });
            // 所有子线程完成触发事件
            childProcessEvent.on('all_child_process_overed', () => {
                features = childFeatures.concat(mainThreadFeatures);
                resolve(helpers.featureCollection(features));
            });
            // 线程分发进行计算
            for (let i = 0; i < cpNum; i++) {
                let unionCp = cp.fork(`${__dirname}/child_process/turfPoint.js`);
                unionCp.send(argumentList.slice(threadProcessNum * i, threadProcessNum * (i + 1)));
                unionCp.on('message', (msg) => {
                    childProcessEvent.emit('child_process_overed', msg);
                    unionCp.disconnect();
                });
            }
            // 主线程同步计算剩余数据
            let leftarguments = argumentList.slice(cpNum * threadProcessNum, argumentList.length);
            for (let argument of leftarguments.values()) {
                mainThreadFeatures.push(helpers.point(argument.coordinates, argument.properties, argument.options));
            }
        }
    });
};

/**
 * 创建 MultiPoint 要素
 */
let multiPoint = (argument) => {
    return helpers.multiPoint(argument.coordinates, argument.properties || {}, argument.options);
};

/**
 * 创建 MultiPointCollection 要素集合
 */
let multiPointCollection = (argumentList) => {
    let threadProcessNum = Math.min(maxProcessNum, Math.max(Math.ceil(argumentList.length / numCPUs), minProcessNum));
    return new Promise((resolve) => {
        if (argumentList.length === 0) {
            resolve(helpers.featureCollection([]));
        } else if (argumentList.length <= threadProcessNum) {
            let list = [];
            for (let argument of argumentList.values()) {
                list.push(helpers.multiPoint(argument.coordinates, argument.properties, argument.options));
            }
            resolve(helpers.featureCollection(list));
        } else {
            // 多线程大量计算
            let childFeatures = []; // 子线程计算数据
            let mainThreadFeatures = []; // 主线程计算数据
            let cpNum = Math.floor(argumentList.length / threadProcessNum); // 分发的子线程数量
            let cpSucessNum = 0; // 子线程完成计算的数量
            let childProcessEvent = new EventEmitter();
            // 子线程计算完成触发事件
            childProcessEvent.on('child_process_overed', (data) => {
                cpSucessNum++;

                childFeatures = childFeatures.concat(data);

                if (cpSucessNum === cpNum) {
                    childProcessEvent.emit('all_child_process_overed');
                }
            });
            // 所有子线程完成触发事件
            childProcessEvent.on('all_child_process_overed', () => {
                features = childFeatures.concat(mainThreadFeatures);
                resolve(helpers.featureCollection(features));
            });
            // 线程分发进行计算
            for (let i = 0; i < cpNum; i++) {
                let unionCp = cp.fork(`${__dirname}/child_process/turfMultiPoint.js`);
                unionCp.send(argumentList.slice(threadProcessNum * i, threadProcessNum * (i + 1)));
                unionCp.on('message', (msg) => {
                    childProcessEvent.emit('child_process_overed', msg);
                    unionCp.disconnect();
                });
            }
            // 主线程同步计算剩余数据
            let leftarguments = argumentList.slice(cpNum * threadProcessNum, argumentList.length);
            for (let argument of leftarguments.values()) {
                mainThreadFeatures.push(helpers.multiPoint(argument.coordinates, argument.properties, argument.options));
            }
        }
    });
};


/**
 * 创建 LineString 要素
 */
let lineString = (argument) => {
    return helpers.lineString(argument.coordinates, argument.properties || {}, argument.options);
};

/**
 * 创建 LineString 要素集合
 */
let lineStringCollection = (argumentList) => {
    let threadProcessNum = Math.min(maxProcessNum, Math.max(Math.ceil(argumentList.length / numCPUs), minProcessNum));
    return new Promise((resolve) => {
        if (argumentList.length === 0) {
            resolve(helpers.featureCollection([]));
        } else if (argumentList.length <= threadProcessNum) {
            let list = [];
            for (let argument of argumentList.values()) {
                list.push(helpers.lineString(argument.coordinates, argument.properties, argument.options));
            }
            resolve(helpers.featureCollection(list));
        } else {
            // 多线程大量计算
            let childFeatures = []; // 子线程计算数据
            let mainThreadFeatures = []; // 主线程计算数据
            let cpNum = Math.floor(argumentList.length / threadProcessNum); // 分发的子线程数量
            let cpSucessNum = 0; // 子线程完成计算的数量
            let childProcessEvent = new EventEmitter();
            // 子线程计算完成触发事件
            childProcessEvent.on('child_process_overed', (data) => {
                cpSucessNum++;

                childFeatures = childFeatures.concat(data);

                if (cpSucessNum === cpNum) {
                    childProcessEvent.emit('all_child_process_overed');
                }
            });
            // 所有子线程完成触发事件
            childProcessEvent.on('all_child_process_overed', () => {
                features = childFeatures.concat(mainThreadFeatures);
                resolve(helpers.featureCollection(features));
            });
            // 线程分发进行计算
            for (let i = 0; i < cpNum; i++) {
                let unionCp = cp.fork(`${__dirname}/child_process/turfLineString.js`);
                unionCp.send(argumentList.slice(threadProcessNum * i, threadProcessNum * (i + 1)));
                unionCp.on('message', (msg) => {
                    childProcessEvent.emit('child_process_overed', msg);
                    unionCp.disconnect();
                });
            }
            // 主线程同步计算剩余数据
            let leftarguments = argumentList.slice(cpNum * threadProcessNum, argumentList.length);
            for (let argument of leftarguments.values()) {
                mainThreadFeatures.push(helpers.lineString(argument.coordinates, argument.properties, argument.options));
            }
        }
    });
};

/**
 * 创建 MultiLineString 要素
 */
let multiLineString = (argument) => {
    return helpers.multiLineString(argument.coordinates, argument.properties || {}, argument.options);
};

/**
 * 创建 MultiLineString 要素集合
 */
let multiLineStringCollection = (argumentList) => {
    let threadProcessNum = Math.min(maxProcessNum, Math.max(Math.ceil(argumentList.length / numCPUs), minProcessNum));
    return new Promise((resolve) => {
        if (argumentList.length === 0) {
            resolve(helpers.featureCollection([]));
        } else if (argumentList.length <= threadProcessNum) {
            let list = [];
            for (let argument of argumentList.values()) {
                list.push(helpers.multiLineString(argument.coordinates, argument.properties, argument.options));
            }
            resolve(helpers.featureCollection(list));
        } else {
            // 多线程大量计算
            let childFeatures = []; // 子线程计算数据
            let mainThreadFeatures = []; // 主线程计算数据
            let cpNum = Math.floor(argumentList.length / threadProcessNum); // 分发的子线程数量
            let cpSucessNum = 0; // 子线程完成计算的数量
            let childProcessEvent = new EventEmitter();
            // 子线程计算完成触发事件
            childProcessEvent.on('child_process_overed', (data) => {
                cpSucessNum++;

                childFeatures = childFeatures.concat(data);

                if (cpSucessNum === cpNum) {
                    childProcessEvent.emit('all_child_process_overed');
                }
            });
            // 所有子线程完成触发事件
            childProcessEvent.on('all_child_process_overed', () => {
                features = childFeatures.concat(mainThreadFeatures);
                resolve(helpers.featureCollection(features));
            });
            // 线程分发进行计算
            for (let i = 0; i < cpNum; i++) {
                let unionCp = cp.fork(`${__dirname}/child_process/turfMultiLineString.js`);
                unionCp.send(argumentList.slice(threadProcessNum * i, threadProcessNum * (i + 1)));
                unionCp.on('message', (msg) => {
                    childProcessEvent.emit('child_process_overed', msg);
                    unionCp.disconnect();
                });
            }
            // 主线程同步计算剩余数据
            let leftarguments = argumentList.slice(cpNum * threadProcessNum, argumentList.length);
            for (let argument of leftarguments.values()) {
                mainThreadFeatures.push(helpers.multiLineString(argument.coordinates, argument.properties, argument.options));
            }
        }
    });
};

/**
 * 创建 Polygon 要素
 */
let polygon = (argument) => {
    return helpers.polygon(argument.coordinates, argument.properties, argument.options);
};

/**
 * 创建 Polygon 要素集合
 */
let polygonCollection = (argumentList) => {
    let threadProcessNum = Math.min(maxProcessNum, Math.max(Math.ceil(argumentList.length / numCPUs), minProcessNum));
    return new Promise((resolve) => {
        if (argumentList.length === 0) {
            resolve(helpers.featureCollection([]));
        } else if (argumentList.length <= threadProcessNum) {
            let list = [];
            for (let argument of argumentList.values()) {
                list.push(helpers.polygon(argument.coordinates, argument.properties, argument.options));
            }
            resolve(helpers.featureCollection(list));
        } else {
            // 多线程大量计算
            let childFeatures = []; // 子线程计算数据
            let mainThreadFeatures = []; // 主线程计算数据
            let cpNum = Math.floor(argumentList.length / threadProcessNum); // 分发的子线程数量
            let cpSucessNum = 0; // 子线程完成计算的数量
            let childProcessEvent = new EventEmitter();
            // 子线程计算完成触发事件
            childProcessEvent.on('child_process_overed', (data) => {
                cpSucessNum++;

                childFeatures = childFeatures.concat(data);

                if (cpSucessNum === cpNum) {
                    childProcessEvent.emit('all_child_process_overed');
                }
            });
            // 所有子线程完成触发事件
            childProcessEvent.on('all_child_process_overed', () => {
                features = childFeatures.concat(mainThreadFeatures);
                resolve(helpers.featureCollection(features));
            });
            // 线程分发进行计算
            for (let i = 0; i < cpNum; i++) {
                let unionCp = cp.fork(`${__dirname}/child_process/turfPolygon.js`);
                unionCp.send(argumentList.slice(threadProcessNum * i, threadProcessNum * (i + 1)));
                unionCp.on('message', (msg) => {
                    childProcessEvent.emit('child_process_overed', msg);
                    unionCp.disconnect();
                });
            }
            // 主线程同步计算剩余数据
            let leftarguments = argumentList.slice(cpNum * threadProcessNum, argumentList.length);
            for (let argument of leftarguments.values()) {
                mainThreadFeatures.push(helpers.polygon(argument.coordinates, argument.properties, argument.options));
            }
        }
    });
};

/**
 * 创建 MultiPolygon 要素
 */
let multiPolygon = (argument) => {
    return helpers.multiPolygon(argument.coordinates, argument.properties, argument.options);
};

/**
 * 创建 MultiPolygon 要素集合
 */
let multiPolygonCollection = (argumentList) => {
    let threadProcessNum = Math.min(maxProcessNum, Math.max(Math.ceil(argumentList.length / numCPUs), minProcessNum));
    return new Promise((resolve) => {
        if (argumentList.length === 0) {
            resolve(helpers.featureCollection([]));
        } else if (argumentList.length <= threadProcessNum) {
            let list = [];
            for (let argument of argumentList.values()) {
                list.push(helpers.multiPolygon(argument.coordinates, argument.properties, argument.options));
            }
            resolve(helpers.featureCollection(list));
        } else {
            // 多线程大量计算
            let childFeatures = []; // 子线程计算数据
            let mainThreadFeatures = []; // 主线程计算数据
            let cpNum = Math.floor(argumentList.length / threadProcessNum); // 分发的子线程数量
            let cpSucessNum = 0; // 子线程完成计算的数量
            let childProcessEvent = new EventEmitter();
            // 子线程计算完成触发事件
            childProcessEvent.on('child_process_overed', (data) => {
                cpSucessNum++;

                childFeatures = childFeatures.concat(data);

                if (cpSucessNum === cpNum) {
                    childProcessEvent.emit('all_child_process_overed');
                }
            });
            // 所有子线程完成触发事件
            childProcessEvent.on('all_child_process_overed', () => {
                features = childFeatures.concat(mainThreadFeatures);
                resolve(helpers.featureCollection(features));
            });
            // 线程分发进行计算
            for (let i = 0; i < cpNum; i++) {
                let unionCp = cp.fork(`${__dirname}/child_process/turfMultiPolygon.js`);
                unionCp.send(argumentList.slice(threadProcessNum * i, threadProcessNum * (i + 1)));
                unionCp.on('message', (msg) => {
                    childProcessEvent.emit('child_process_overed', msg);
                    unionCp.disconnect();
                });
            }
            // 主线程同步计算剩余数据
            let leftarguments = argumentList.slice(cpNum * threadProcessNum, argumentList.length);
            for (let argument of leftarguments.values()) {
                mainThreadFeatures.push(helpers.multiPolygon(argument.coordinates, argument.properties, argument.options));
            }
        }
    });
};

/**
 * 四舍五入
 */
let round = (argument) => {
    return helpers.round(argument.num, argument.precision);
};

module.exports = {
    feature,
    featureCollection,
    geometry,
    geometryCollection,
    point,
    pointCollection,
    multiPoint,
    multiPointCollection,
    lineString,
    lineStringCollection,
    multiLineString,
    multiLineStringCollection,
    polygon,
    polygonCollection,
    multiPolygon,
    multiPolygonCollection,
    round
};
