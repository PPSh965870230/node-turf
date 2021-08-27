const {
    polygon
} = require("@turf/helpers");

process.on('message', (data) => {
    sendData(polygonList(data));
});

let polygonList = (data) => {
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(polygon(data[i].coordinates, data[i].properties, data[i].options));
    }
    return list;
};

let sendData = (data) => {
    process.send(data);
};