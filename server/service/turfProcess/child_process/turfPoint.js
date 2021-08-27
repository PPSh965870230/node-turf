const {
    point
} = require("@turf/helpers");

process.on('message', (data) => {
    sendData(pointList(data));
});

let pointList = (data) => {
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(point(data[i].coordinates, data[i].properties, data[i].options));
    }
    return list;
};

let sendData = (data) => {
    process.send(data);
};