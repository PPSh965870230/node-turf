const turfCleanCoords = require('@turf/clean-coords');
const turfFlip = require('@turf/flip');
const turfRewind = require('@turf/rewind');
const turfTruncate = require('@turf/truncate');

/**
 * 清除冗余点
 */
let cleanCoords = (argument) => {
    return turfCleanCoords(argument.feature, argument.options);
};

/**
 * 翻转坐标
 */
let flip = (argument) => {
    return turfFlip(argument.feature, argument.options);
};

/**
 * 翻转图形
 */
let rewind = (argument) => {
    return turfRewind(argument.feature, argument.options);
};

/**
 * 要素点位精度
 */
 let truncate = (argument) => {
    return turfTruncate(argument.feature, argument.options);
};



module.exports = {
    cleanCoords,
    flip,
    rewind,
    truncate
};