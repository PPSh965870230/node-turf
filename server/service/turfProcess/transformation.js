const minProcessNum = 200; // 线程最小处理数据数量
const maxProcessNum = 320; // 线程最大处理数据数量
const cp = require('child_process');
const EventEmitter = require('events');
const numCPUs = require('os').cpus().length;

const turfUnion = require('@turf/union');
const turfBboxClip = require('@turf/bbox-clip');
const turfBezierSpline = require('@turf/bezier-spline');
const turfBuffer = require('@turf/buffer');
const turfCircle = require('@turf/circle');
const turfClone = require('@turf/clone');
const turfConcave = require('@turf/concave');
const turfConvex = require('@turf/convex');

/**
 * 多边形融合
 */
let union = (multiPolygons) => {
    let threadProcessNum = Math.min(maxProcessNum, Math.max(Math.ceil(multiPolygons.length / numCPUs), minProcessNum));
    return new Promise((resolve) => {
        // 处理多组数据
        if (multiPolygons.length === 0) {
            // 无数据直接返回
            resolve(multiPolygons);
        } else if (multiPolygons.length <= threadProcessNum) {
            // 小于某个阈值不进行线程分发
            resolve(turfUnion(...multiPolygons));
        } else {
            // 多线程处理大量数据
            let unionPolygon = null; // 子线程计算的融合数据
            let mainThreadPolygon = null; // 主线程计算的融合数据
            let cpNum = Math.floor(multiPolygons.length / threadProcessNum); // 分发的子线程数量
            let cpSucessNum = 0; // 子线程完成计算的数量
            let childProcessEvent = new EventEmitter();
            // 子线程计算完成触发时间
            childProcessEvent.on('child_process_overed', (data) => {
                cpSucessNum++;
                if (unionPolygon) {
                    unionPolygon = turfUnion(unionPolygon, data);
                } else {
                    unionPolygon = data;
                }
                if (cpSucessNum === cpNum) {
                    childProcessEvent.emit('all_child_process_overed');
                }
            });
            // 所有子线程完成触发事件
            childProcessEvent.on('all_child_process_overed', () => {
                unionPolygon = turfUnion(unionPolygon, mainThreadPolygon);
                resolve(unionPolygon);
            });
            // 线程分发进行计算
            for (let i = 0; i < cpNum; i++) {
                let unionCp = cp.fork(`${__dirname}/child_process/turfUnion.js`);
                unionCp.send(multiPolygons.slice(threadProcessNum * i, threadProcessNum * (i + 1)));
                unionCp.on('message', (msg) => {
                    childProcessEvent.emit('child_process_overed', msg);
                    unionCp.disconnect();
                });
            }
            // 主线程同步计算剩余数据
            let leftPolygons = multiPolygons.slice(cpNum * threadProcessNum, multiPolygons.length);
            if (leftPolygons === 0 || leftPolygons === 1) {
                mainThreadPolygon = multiPolygons[multiPolygons.length - 1];
            } else {
                mainThreadPolygon = turfUnion(...leftPolygons);
            }
        }
    });
}

/**
 * 剪切多边形
 */
let bboxClip = (argument) => {
    return turfBboxClip(argument.feature, argument.bbox);
};

/**
 * 将线条通过贝塞尔算法转换成曲线
 */
let bezierSpline = (argument) => {
    return turfBezierSpline(argument.line, argument.options);
};

/**
 * 计算要素缓冲区
 */
let buffer = (argument) => {
    return turfBuffer(argument.feature, argument.radius || 0, argument.options);
};

/**
 * 生成圆
 */
let circle = (argument) => {
    return turfCircle(argument.center, argument.radius || 0, argument.options);
};

/**
 * 克隆副本
 */
let clone = (argument) => {
    return turfClone(argument);
};

/**
 * 生成凹多边形
 */
let concave = (argument) => {
    return turfConcave(argument.points, argument.options);
};

/**
 * 生成凸多边形
 */
let convex = (argument) => {
    return turfConvex(argument.points, argument.options);
};

module.exports = {
    union,
    bboxClip,
    bezierSpline,
    buffer,
    circle,
    clone,
    concave,
    convex
};