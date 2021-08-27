const turfAlong = require('@turf/along');
const turfArea = require('@turf/area');
const turfBbox = require('@turf/bbox');
const turfBboxPolygon = require('@turf/bbox-polygon');
const turfBearing = require('@turf/bearing');
const turfCenter = require('@turf/center');
const turfCenterOfMass = require('@turf/center-of-mass');
const turfCentroid = require('@turf/centroid');
const turfDestination = require('@turf/destination');
const turfDistance = require('@turf/distance');
const turfEnvelope = require('@turf/envelope');
const turfLength = require('@turf/length');
const turfMidPoint = require('@turf/midpoint');
const turfPointOnFeature = require('@turf/point-on-feature');
const turfPolygonTangents = require('@turf/polygon-tangents');
const turfPointToLineDistance = require('@turf/point-to-line-distance').default;
const turfRhumbBearing = require('@turf/rhumb-bearing');
const turfRhumbDestination = require('@turf/rhumb-destination');
const turfRhumbDistance = require('@turf/rhumb-distance');
const turfSquare = require('@turf/square');
const turfGreatCircle = require('@turf/great-circle');
/**
 * 分析出沿线点要素
 */
let along = (argument) => {
    return turfAlong(argument.line, argument.distance || 0, argument.options || {
        unit: 'kilometers'
    });
};

/**
 * 计算Feature面积值
 */
let area = (argument) => {
    return turfArea(argument);
};

/**
 * 计算边界值
 */
let bbox = (argument) => {
    return turfBbox(argument);
};

/**
 * 绘制出bbox要素矩形
 */
let bboxPolygon = (argument) => {
    return turfBboxPolygon(argument.bbox, argument.options);
};

/**
 * 计算两点间方位角
 */
let bearing = (argument) => {
    return turfBearing(argument.start, argument.end, argument.options);
};

/**
 * 计算多个点的绝对中心点
 */
let center = (argument) => {
    return turfCenter(argument.features, argument.options);
};

/**
 * 计算多边形的质心
 */
let centerOfMass = (argument) => {
    return turfCenterOfMass(argument.features, argument.options);
};

/**
 * 计算多边形所有顶点平均值的质心
 */
let centroid = (argument) => {
    return turfCentroid(argument.features, argument.options);
};

/**
 * 根据一点计算另外一点
 */
let destination = (argument) => {
    return turfDestination(argument.origin, argument.distance, argument.bearing, argument.options);
};

/**
 * 计算两点距离
 */
let distance = (argument) => {
    return turfDistance(argument.from, argument.to, argument.options);
};

/**
 * 根据输入要素返回包含所有顶点的矩形
 */
let envelope = (argument) => {
    return turfEnvelope(argument);
};

/**
 * 根据输入线要素测量长度
 */
let length = (argument) => {
    return turfLength(argument.line, argument.options);
};

/**
 * 根据两点计算中间点
 */
let midPoint = (argument) => {
    if (!argument || !Array.isArray(argument) || argument.length < 2) {
        throw new Error('points must provide');
    }

    return turfMidPoint(argument[0], argument[1]);
};

/**
 * 返回必定在feature上的点
 */
let pointOnFeature = (argument) => {
    return turfPointOnFeature(argument);
};

/**
 * 返回点与多边形的切点
 */
let polygonTangents = (argument) => {
    return turfPolygonTangents(argument.point, argument.polygon);
};

/**
 * 返回点与线段的最短距离
 */
let pointToLineDistance = (argument) => {
    return turfPointToLineDistance(argument.point, argument.line, argument.options);
};

/**
 * 根据两点计算沿等角航线找到它们之间的方位角
 */
let rhumbBearing = (argument) => {
    return turfRhumbBearing(argument.start, argument.end, argument.options);
};

/**
 * 由给定点进行距离、方位偏移
 */
let rhumbDestination = (argument) => {
    return turfRhumbDestination(argument.origin, argument.distance, argument.bearing, argument.options);
};

/**
 * 计算两点之间菱形线的距离
 */
let rhumbDistance = (argument) => {
    return turfRhumbDistance(argument.from, argument.to, argument.options);
};

/**
 * 计算最小正方形边界框
 */
let square = (argument) => {
    return turfSquare(argument);
};

/**
 * 计算大圈弧度
 */
let greatCircle = (argument) => {
    return turfGreatCircle(argument.start, argument.end, argument.options);
};

module.exports = {
    along,
    area,
    bbox,
    bboxPolygon,
    bearing,
    center,
    centerOfMass,
    centroid,
    destination,
    distance,
    envelope,
    length,
    midPoint,
    pointOnFeature,
    polygonTangents,
    pointToLineDistance,
    rhumbBearing,
    rhumbDestination,
    rhumbDistance,
    square,
    greatCircle
};