const {
    multiPoint
} = require("@turf/helpers");

process.on('message', (data) => {
    sendData(multiPointList(data));
});

let multiPointList = (data) => {
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(multiPoint(data[i].coordinates, data[i].properties, data[i].options));
    }
    return list;
};

let sendData = (data) => {
    process.send(data);
};