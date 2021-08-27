const {
    multiPolygon
} = require("@turf/helpers");

process.on('message', (data) => {
    sendData(multiPolygonList(data));
});

let multiPolygonList = (data) => {
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(multiPolygon(data[i].coordinates, data[i].properties, data[i].options));
    }
    return list;
};

let sendData = (data) => {
    process.send(data);
};