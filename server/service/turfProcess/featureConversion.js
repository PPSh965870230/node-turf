const turfCombine = require('@turf/combine');

/**
 * 融合一个要素集(PointCollection,LineStringCollection,PolygonCollection)为一个Multi要素集合  (MultiPointCollection,MultiLineStringCollection,MultiPolygonCollection)
 */
let combine = (argument)=>{
    return turfCombine(argument);
};

module.exports = {
    combine,
};
