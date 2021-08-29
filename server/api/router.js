/**
 * @router 处理路由数据
 */
const resHead = require('../netStatCode');
const helpers = require('../service/turfProcess/helpers');
const transformation = require('../service/turfProcess/transformation');
const measurement = require('../service/turfProcess/measurement');
const coordMutation = require('../service/turfProcess/coordMutation');
const featureConversion = require('../service/turfProcess/featureConversion');

/**
 * 接口名 feature
 * @description 从 Geometry 创建一个 GeoJSON 格式的要素
 * @param {Object} argument 形如:
 *               {
 *                  geometry: Geometry 图形格式,
 *                  properties: Object 添加到feature的属性值,
 *                  options: Object 参数设置 { bbox: Array[] 边界设置, id: String|Number feature的id }
 *               }
 * @return Feature(GeoJSON)
 */
let feature = (req, res) => {
    receiveData(req, res, helpers.feature);
};

/**
 * 接口名 featureCollection
 * @description 从 Feature[] 中创建一个 FeatureCollection 要素集合
 * @param {Object} argument 形如:
 *               {
 *                  features: [Feature], 待添加的要素数组
 *                  options: Object, 参数设置 { bbox: Array[] 边界设置, id: String|Number feature的id }
 *               }
 * @return FeatureCollection (GeoJSON)
 */
let featureCollection = (req, res) => {
    receiveData(req, res, helpers.featureCollection);
};

/**
 * 接口名 geometry
 * @description 从坐标点创建一个 GeoJSON 格式的Geometry图形
 * @param {Object} argument 形如:
 *               {
 *                  type: String 图形描述 Point、LineString、MultiLineString、Polygon, MultiPolygon等,
 *                  coordinates: Array<n>, 坐标点集
 *               }
 * @return Geometry(GeoJSON)
 */
let geometry = (req, res) => {
    receiveData(req, res, helpers.geometry);
};

/**
 * 接口名 geometryCollection
 * @description 从Geometry数组创建一个GeometryCollection
 * @param {Object} argument 形如:
 *               {
 *                  geometries: Array,
 *                  properties: Object, 属性值
 *                  options: Object 参数设置 { bbox: Array 边界设置, id: String|Number id }
 *               }
 * @return Feature<GeometryCollection>(GeoJSON)
 */
let geometryCollection = (req, res) => {
    receiveData(req, res, helpers.geometryCollection);
};


/**
 * 接口名 point
 * @description 从输入点集创建一个 Point 要素
 * @method POST
 * @param {Object} argument 形如:
 *               {
 *                  coordinates: Array[] 坐标点,
 *                  properties: Object 添加到feature中的属性值
 *                  options: Object 参数设置 { bbox: Array[] 边界设置, id: String|Number id }
 *               }
 * @return Point(GeoJSON)
 */
let point = (req, res) => {
    receiveData(req, res, helpers.point);
};

/**
 * 接口名 pointCollection
 * @description 从输入数据集合创建一个 PointCollection 要素集合
 * @method POST
 * @param [<point参数>]
 * @return  FeatureCollection<Point> (GeoJSON)
 */
let pointCollection = (req, res) => {
    receiveDataUseMultiWorker(req, res, helpers.pointCollection);
};

/**
 * 接口名 multiPoint
 * @description 从输入数据集合创建一个 multiPoint 要素
 * @method POST
 * @param {Object} argument 形如:
 *               {
 *                  coordinates: Array[][] 坐标点集合,
 *                  properties: Object 添加到feature中的属性值
 *                  options: Object 参数设置 { bbox: Array[] 边界设置, id: String|Number id }
 *               }
 * @return  MultiPoint(GeoJSON)
 */
let multiPoint = (req, res) => {
    receiveData(req, res, helpers.multiPoint);
};

/**
 * 接口名 multiPointCollection
 * @description 从输入数据集合创建一个 MultiPointCollection 要素集合
 * @method POST
 * @param [<multiPoint参数>]
 * @return  FeatureCollection<MultiPoint> (GeoJSON)
 */
let multiPointCollection = (req, res) => {
    receiveDataUseMultiWorker(req, res, helpers.multiPointCollection);
};

/**
 * 接口名 lineString
 * @description 从输入点集创建一个 LineString 要素
 * @method POST
 * @param {Object} argument 形如:
 *               {
 *                  coordinates: Array[][] 坐标点集合,
 *                  properties: Object 添加到feature中的属性值
 *                  options: Object 参数设置 { bbox: Array[] 边界设置, id: String|Number id }
 *               }
 * @return LineString(GeoJSON)
 */
let lineString = (req, res) => {
    receiveData(req, res, helpers.lineString);
};

/**
 * 接口名 lineStringCollection
 * @description 从输入数据集合创建一个 LineString 要素集合
 * @method POST
 * @param [<lineString参数>]
 * @return  FeatureCollection<LineString> (GeoJSON)
 */
let lineStringCollection = (req, res) => {
    receiveDataUseMultiWorker(req, res, helpers.lineStringCollection);
};

/**
 * 接口名 multiLineString
 * @description 从输入点集创建一个 MultiLineString 要素
 * @method POST
 * @param {Object} argument 形如:
 *               {
 *                  coordinates: Array[][][] 坐标点集合,
 *                  properties: Object 添加到feature中的属性值
 *                  options: Object 参数设置 { bbox: Array[] 边界设置, id: String|Number id }
 *               }
 * @return MultiLineString(GeoJSON)
 */
let multiLineString = (req, res) => {
    receiveData(req, res, helpers.multiLineString);
};

/**
 * 接口名 multiLineStringCollection
 * @description 从输入数据集合创建一个 LineString 要素集合
 * @method POST
 * @param [<multiLineString参数>]
 * @return FeatureCollection<MultiLineString>(GeoJSON)
 */
let multiLineStringCollection = (req, res) => {
    receiveDataUseMultiWorker(req, res, helpers.multiLineStringCollection);
};

/**
 * 接口名 polygon
 * @description 从输入点集创建一个 Polygon 要素
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  coordinates: Array[][][] 构成要素点,
 *                  properties: Object 属性键值对,
 *                  options: Object 配置参数 { bbox: Array 边界设置, id: String|Number id }
 *              }
 * @return Polygon(GeoJSON)
 */
let polygon = (req, res) => {
    receiveData(req, res, helpers.polygon);
};

/**
 * 接口名 polygonCollection
 * @description 从输入数据集合创建一个 Polygon 要素集合
 * @method POST
 * @param [<Polygon参数>]
 * @return FeatureCollection<Polygon>(GeoJSON)
 */
let polygonCollection = (req, res) => {
    receiveDataUseMultiWorker(req, res, helpers.polygonCollection);
};

/**
 * 接口名 multiPolygon
 * @description 从输入点集创建一个 MultiPolygon 要素
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  coordinates: Array[][][][] 构成要素点,
 *                  properties: Object 属性值,
 *                  options: Object 配置参数 { bbox: Array 边界设置, id: String|Number id }
 *              }
 * @return MultiPolygon(GeoJSON)
 */
let multiPolygon = (req, res) => {
    receiveData(req, res, helpers.multiPolygon);
};

/**
 * 接口名 multiPolygonCollection
 * @description 从输入数据集合创建一个 MultiPolygon 要素集合
 * @method POST
 * @param [<Polygon参数>]
 * @return FeatureCollection<MultiPolygon>(GeoJSON)
 */
let multiPolygonCollection = (req, res) => {
    receiveDataUseMultiWorker(req, res, helpers.multiPolygonCollection);
};

/**
 * 接口名 union
 * @description 融合一组多边形要素为单一融合要素， 去重叠区域
 * @method POST
 * @param {polygon[] | multiPolygon[] } 待融合的多边形数据集合
 * @return {Polygon | MultiPolygon} 融合之后的多边形要素
 */
let union = (req, res) => {
    receiveDataUseMultiWorker(req, res, transformation.union);
};

/**
 * 接口名 bboxClip
 * @description 使用BBox去剪切要素
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  feature: Feature 待剪切的要素,
 *                  bbox: BBox 剪切范围
 *              }
 * @return Feature 剪切后的Feature
 */
let bboxClip = (req, res) => {
    receiveData(req, res, transformation.bboxClip);
};

/**
 * 接口名 bezierSpline
 * @description 将输入的LineString通过Bezier算法转换成弯曲版本
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  line: Feature<LineString> 输入的LineString,
 *                  options: { properties: Object 属性设置, resolution: Number 中间点插值数量 默认 10000, sharpness: Number 线条弯曲程度 默认 .85 }
 *              }
 * @return Feature<LineString> 转换后的Feature
 */
let bezierSpline = (req, res) => {
    receiveData(req, res, transformation.bezierSpline);
};

/**
 * 接口名 buffer
 * @description 计算给定半径的输入要素的缓冲区
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  feature: Feature|FeatureCollection|Geometry 输入要素,
 *                  radius: Number 缓冲区的距离, 允许负值, 默认 0 无返回值
 *                  options: { units: String 单位 默认 'kilometers', steps: Number 缓冲区步进 默认 8 }
 *              }
 * @return FeatureCollection|Feature<Polygon|MultiPolygon>|undefined 缓冲区要素
 */
let buffer = (req, res) => {
    receiveData(req, res, transformation.buffer);
};

/**
 * 接口名 circle
 * @description 根据中心点及半径生成圆
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  center: Feature<Point>|Array<Number> 中心点,
 *                  radius: Number 圆半径
 *                  options: { units: String 单位 默认 'kilometers', steps: Number 步进 默认 64, properties: Object 属性设置 }
 *              }
 * @return Feature<Polygon> 圆要素
 */
let circle = (req, res) => {
    receiveData(req, res, transformation.circle);
};

/**
 * 接口名 clone
 * @description 返回GeoJSON的克隆副本，比常见的JSON处理更快
 * @method POST
 * @param {GeoJSON} argument GeoJSON对象
 * @return GeoJSON 副本
 */
let clone = (req, res) => {
    receiveData(req, res, transformation.clone);
};

/**
 * 接口名 concave
 * @description 根据一组点生成凹Polygon或MultiPolygon,内部通过turf-tin生成图形
 * @method POST
 * @param {GeoJSON} argument 形如:
 *              {
 *                  points: FeatureCollection|Point 点,
 *                  options: { maxEdge: Number 凹多边形形成所必需的边缘长度 默认 Infinity(不能生成凹多边形), units: String 单位 默认 'kilometers' }
 *              }
 * @return Feature <(Polygon|MultiPolygon)>|null
 */
let concave = (req, res) => {
    receiveData(req, res, transformation.concave);
};

/**
 * 接口名 convex
 * @description 根据一组点生成凸Polygon或MultiPolygon,内部通过turf-tin生成图形
 * @method POST
 * @param {GeoJSON} argument 形如:
 *              {
 *                  points: FeatureCollection|Point 点,
 *                  options: { concavity: Number 凸多边形形成所必需的边缘长度 默认 Infinity, units: String 单位 默认 'kilometers' }
 *              }
 * @return Feature <(Polygon|MultiPolygon)>|null
 */
 let convex = (req, res) => {
    receiveData(req, res, transformation.convex);
};

/**
 * 接口名 along
 * @description 从输入的 LineString 要素返回指定距离处的要素点
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  line: Feature<LineString> 线要素,
 *                  distance: Number 距离值,
 *                  options: Object 参数设置 { unit: String 单位 默认 'kilometers' }
 *              }
 */
let along = (req, res) => {
    receiveData(req, res, measurement.along);
};

/**
 * 接口名 area
 * @description 根据传入的 Feature(GeoJSON) 要素返回以平方米为单位的面积值
 * @method POST
 * @param {FeatureCollection<GeoJSON> | Feature<GeoJSON>} argument 形如: [Feature<GeoJSON>]
 * @return Number 面积值, 如果传入 FeatureCollection 返回总面积
 */
let area = (req, res) => {
    receiveData(req, res, measurement.area);
};

/**
 * 接口名 bbox
 * @description 根据传入的 Feature(GeoJSON) 要素返回一个边界框
 * @method POST
 * @param {FeatureCollection<GeoJSON> | Feature<GeoJSON>} argument 形如: [Feature<GeoJSON>]
 * @return BBox 边界值, 格式顺序 minX, minY, maxX, maxY
 */
let bbox = (req, res) => {
    receiveData(req, res, measurement.bbox);
};

/**
 * 接口名 bboxPolygon
 * @description 根据传入的 Feature(GeoJSON) 要素返回一个边界框要素
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  bbox: Array, 以 minX, minY, maxX, maxY 为格式的边界值,
 *                  options: { properties: Object 添加到要素的属性值, id: String|Number id }
 *              }
 * @return Feature<Polygon> 边界要素
 */
let bboxPolygon = (req, res) => {
    receiveData(req, res, measurement.bboxPolygon);
};

/**
 * 接口名 bearing
 * @description 根据传入的两点找出它们之间的地理方位，角度从the north line开始测量
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  start: Point,
 *                  end: Point,
 *                  options: Object 参数设置 { final: Boolean 设置最终方位角是否进行归一到[-180,180]区间 }
 *              }
 * @return Number 顺时针十进制角度，区间 [-180, 180]
 */
let bearing = (req, res) => {
    receiveData(req, res, measurement.bearing);
};

/**
 * 接口名 center
 * @description 根据输入的要素或要素集合，返回所有要素的绝对中心点
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  features: <Feature | FeatureCollection>
 *                  options: Object 参数设置 { properties: Object 属性设置, bbox: Array 边界设置, id: String|Number id }
 *              }
 * @return Feature<Point> 输入要素的绝对中心点
 */
let center = (req, res) => {
    receiveData(req, res, measurement.center);
};

/**
 * 接口名 centerOfMass
 * @description 根据输入的要素或要素集合，返回所有要素的多边形质心
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  features: <Feature | FeatureCollection>
 *                  options: Object 参数设置 { properties: Object 属性设置 }
 *              }
 * @return Feature<Point> 输入要素多边形的质心
 */
let centerOfMass = (req, res) => {
    receiveData(req, res, measurement.centerOfMass);
};

/**
 * 接口名 centroid
 * @description 根据输入的要素或要素集合，返回所有要素多边形顶点的平均值计算出的质心
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  features: <Feature | FeatureCollection>
 *                  options: Object 参数设置 { properties: Object 属性设置 }
 *              }
 * @return Feature<Point> 输入要素多边形顶点平均值的质心
 */
let centroid = (req, res) => {
    receiveData(req, res, measurement.centroid);
};

/**
 * 接口名  destination
 * @description 根据输入的要素点计算给定的以度、弧度、英里或公里为单位的距离目的地点的位置
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  origin: Feature<Point> 起点,
 *                  distance: Number 离起点的距离,
 *                  bearing: Number 方位角 [-180, 180],
 *                  options: Object 参数设置 { units: String 距离单位 默认 'kilometers, properties: Object 属性值 }
 *              }
 * @return Feature<Point> 终点
 */
let destination = (req, res) => {
    receiveData(req, res, measurement.destination);
};

/**
 * 接口名  distance
 * @description 根据输入的两个要素点计算两点之间距离
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  from: Feature<Point> 起点,
 *                  to: Feature<Point> 终点,
 *                  options: Object 参数设置 { units: String 距离单位 默认 'kilometers }
 *              }
 * @return Number 距离
 */
let distance = (req, res) => {
    receiveData(req, res, measurement.distance);
};

/**
 * 接口名  envelope
 * @description 根据输入的所有要素返回一个包含所有顶点的矩形要素
 * @method POST
 * @param {Object} Feature | FeatureCollection
 * @return Feature<Polygon> (GeoJSON)
 */
let envelope = (req, res) => {
    receiveData(req, res, measurement.envelope);
};

/**
 * 接口名  length
 * @description 根据输入的线要素以指定的单位测量其长度
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  line: Feature<LineString|MultiLineString> 线要素,
 *                  options: 参数设置 { units: String 单位 默认 kilometers }
 *              }
 * @return Number 长度
 */
let length = (req, res) => {
    receiveData(req, res, measurement.length);
};

/**
 * 接口名  midPoint
 * @description 根据输入两个点要素返回它们的中间点，已经考虑的地球曲率
 * @method POST
 * @param {Array} argument 形如:
 *              [point1, point2]
 * @return Feature<Point>
 */
let midPoint = (req, res) => {
    receiveData(req, res, measurement.midPoint);
};

/**
 * 接口名  pointOnFeature
 * @description 根据输入的Feature或FeatureCollection，返回一个要素点保证在Feature上
 * @method POST
 * @param {Feature|FeatureCollection} argument
 * @return Feature<Point>
 */
let pointOnFeature = (req, res) => {
    receiveData(req, res, measurement.pointOnFeature);
};

/**
 * 接口名  polygonTangents
 * @description 根据一点获取多边形的切点
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  point: Point 点,
 *                  polygon: Polygon | MultiPolygon 多边形
 *              }
 * @return FeatureCollection<Point> 点与多边形的切点
 */
let polygonTangents = (req, res) => {
    receiveData(req, res, measurement.polygonTangents);
};

/**
 * 接口名  pointToLineDistance
 * @description 返回一点到 LineString 的最短距离
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  point: Point | Geometry 点,
 *                  line: LineString | Geometry  线段,
 *                  options: { units: String 单位 默认 'kilometers', method: String 是否根据地球曲率平面计算 取值: 'geodesic'(默认)、'planar' }
 *              }
 * @return Number 点与线的最短距离
 */
let pointToLineDistance = (req, res) => {
    receiveData(req, res, measurement.pointToLineDistance);
};

/**
 * 接口名  rhumbBearing
 * @description 根据两点计算沿等角航线找到它们之间的方位角
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  start: Point 起始点,
 *                  end: Point  终点,
 *                  options: { final:Boolean 设置最终方位角是否进行归一到[-180,180]区间 }
 *              }
 * @return Number 顺时针十进制角度，区间 [-180, 180]
 */
let rhumbBearing = (req, res) => {
    receiveData(req, res, measurement.rhumbBearing);
};

/**
 * 接口名  rhumbDestination
 * @description 根据给定原点沿等角航线通过给定距离、方位角进行偏移，返回偏移点
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  origin: Point 起始点,
 *                  distance: Number  偏移距离,
 *                  bearing: Number 方位角(from north) [-180, 180],
 *                  options: { units: String 单位 默认 'kilometers', properties: Object 属性值 }
 *              }
 * @return Feature<Point> 目的点
 */
let rhumbDestination = (req, res) => {
    receiveData(req, res, measurement.rhumbDestination);
};

/**
 * 接口名  rhumbDistance
 * @description 计算沿两点之间的菱形线的距离
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  from: Point 起始点,
 *                  to: Point 起始点,
 *                  options: { units: String 单位 默认 'kilometers' }
 *              }
 * @return Number 距离
 */
let rhumbDistance = (req, res) => {
    receiveData(req, res, measurement.rhumbDistance);
};

/**
 * 接口名  square
 * @description 根据输入的边界框计算包含输入的最小正方形边界框
 * @method POST
 * @param {Array<BBox>} argument
 * @return BBox 正方形边界框
 */
let square = (req, res) => {
    receiveData(req, res, measurement.square);
};

/**
 * 接口名  greatCircle
 * @description 根据输入的两点确定两点间的大圈曲线路径，返回 LinString或MultiLineString
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  start: Point 起点,
 *                  end: Point 终点,
 *                  options: { properties: Object 属性设置, npoints: Number 线要素点组成数量 默认100, offset: Number 跨越日期线的可能性,越大越有可能 默认10 }
 *              }
 * @return Feature<LineString|MultiLineString> 线要素
 */
let greatCircle = (req, res) => {
    receiveData(req, res, measurement.greatCircle);
};

/**
 * 接口名  cleanCoords
 * @description 从输入的Feature或Geometry中删除冗余坐标
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  feature: Feature|Geometry 要素或图元,
 *                  options: { mutate: Boolean 允许更改输入的GeoJSON 默认 false }
 *              }
 * @return Feature|Geometry 优化冗余后的Feature或Geometry
 */
let cleanCoords = (req, res) => {
    receiveData(req, res, coordMutation.cleanCoords);
};

/**
 * 接口名  flip
 * @description 将传入的Feature的所有坐标[x,y]翻转为[y,x]
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  feature: Feature 要素,
 *                  options: { mutate: Boolean 允许更改输入的GeoJSON 默认 false }
 *              }
 * @return Feature
 */
let flip = (req, res) => {
    receiveData(req, res, coordMutation.flip);
};

/**
 * 接口名  rewind
 * @description 翻转(Multi)LineString或(Multi)Polygon, 逆时针外圈，顺时针内圈
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  feature: Feature 要素,
 *                  options: { mutate: Boolean 允许更改输入的GeoJSON 默认 false, reverse: Boolean 启用反向绕线 默认 false }
 *              }
 * @return Feature
 */
let rewind = (req, res) => {
    receiveData(req, res, coordMutation.rewind);
};

/**
 * 接口名  round
 * @description 四舍五入到给定精度
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  num: Number 数值,
 *                  precision: Number 精度值
 *              }
 * @return Number 四舍五入值
 */
let round = (req, res) => {
    receiveData(req, res, helpers.round);
};

/**
 * 接口名  truncate
 * @description 根据传入的Feature|FeatureCollection截取精度
 * @method POST
 * @param {Object} argument 形如:
 *              {
 *                  feature: Feature|FeatureCollection 要素,
 *                  options: { precision: Number 精度值 默认 6, coordinates: Number 坐标的最大值, mutate: Boolean 允许修改输入Feature 默认 false }
 *              }
 * @return Feature
 */
let truncate = (req, res) => {
    receiveData(req, res, coordMutation.truncate);
};

/**
 * 接口名  combine
 * @description 融合FeatureCollection为MultiFeature
 * @method POST
 * @param {Object<FeatureCollection>} argument
 * @return MultiFeature
 */
let combine = (req, res)=>{
    receiveData(req, res, featureConversion.combine);
};


/**
 * 共用接收数据方法
 * @param {Request} req
 * @param {Response} res
 * @param {Function} method 处理数据方法
 */
let receiveData = (req, res, method) => {
    let datastr = "";

    req.on('data', chunk => {
        datastr += chunk;
    });
    req.on('end', () => {
        if (datastr === "") {
            datastr = "null";
        }
        try {
            resHead.commonResHead_200(res, JSON.stringify(method(JSON.parse(datastr))));
        } catch (e) {
            resHead.commonResHead_500(res, e.toString());
        };
    });
};

/**
 * 共用接收数据方法, 使用child_process处理数据
 * @param {Request} req
 * @param {Response} res
 * @param {Function} method 处理数据方法
 */
let receiveDataUseMultiWorker = (req, res, method) => {
    let datastr = "";

    req.on('data', chunk => {
        datastr += chunk;
    });
    req.on('end', () => {
        if (datastr === "") {
            datastr = "null";
        }
        method(JSON.parse(datastr)).then(data => {
            resHead.commonResHead_200(res, JSON.stringify(data));
        }).catch(e => {
            resHead.commonResHead_500(res, e.toString())
        });
    });
};

module.exports = {
    // helpers
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
    round,

    // transformation
    bboxClip,
    bezierSpline,
    buffer,
    circle,
    clone,
    concave,
    convex,
    union,

    // measurement
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
    greatCircle,

    // coordinate mutation
    cleanCoords,
    flip,
    rewind,
    truncate,

    // feature conversion
    combine,
};
