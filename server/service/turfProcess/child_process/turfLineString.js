const {
    lineString
} = require("@turf/helpers");

process.on('message', (data) => {
    sendData(lineStringList(data));
});

let lineStringList = (data) => {
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list.push(lineString(data[i].coordinates, data[i].properties, data[i].options));
    }
    return list;
};

let sendData = (data) => {
    process.send(data);
};