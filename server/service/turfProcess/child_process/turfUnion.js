const {
    default: union
} = require("@turf/union");


process.on('message', (data) => {
    sendData(unionPolygon(data));
});

let unionPolygon = (data) => {
    return union(...data);
};

let sendData = (data) => {
    process.send(data);
};