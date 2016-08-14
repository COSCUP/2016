var ajax      = require('superagent');
var loaded    = 0;
var callbacks = [];

var hssbData  = {};
var gymData   = {};
var hssbRoom  = {
    "R0": {
        "nameen": "R0",
        "namezh": "國際會議廳"
    },
    "R1": {
        "nameen": "R1",
        "namezh": "第一會議室"
    },
    "R2": {
        "nameen": "R2",
        "namezh": "第二會議室"
    }
};
var gymRoom   = {
    "H0": {
        "nameen": "H0",
        "namezh": "大禮堂"
    },
    "H1": {
        "nameen": "H1",
        "namezh": "第一會議室"
    },
    "H2": {
        "nameen": "H2",
        "namezh": "第二會議室"
    },
    "H3": {
        "nameen": "H3",
        "namezh": "第三會議室"
    },
    "H4": {
        "nameen": "H4",
        "namezh": "第四會議室"
    },
    "HP": {
        "nameen": "HP",
        "namezh": "平面會議室"
    }
};

// Processing data
function procFinal() {
    if( ++loaded == 2 )
        for(var callback of callbacks)
            callback();
}

function procRoomData(roomData) {
    roomData.forEach((ele) => {
        if( ele.room=="R0" ||
            ele.room=="R1" ||
            ele.room=="R2" )
            hssbRoom[ele.room] = {
                nameen: ele.room,
                namezh: ele.name
            }
        else
            gymRoom[ele.room]  = {
                nameen: ele.room,
                namezh: ele.name
            }
    });
    procFinal();
}

function procProgData(progData) {
    progData.forEach((ele) => {
        if( ele.slot[0] == "K" ) {
            hssbData[ele.slot] = ele;
            gymData [ele.slot] = ele;
        }
        else if( ele.room=="R0" ||
            ele.room=="R1" ||
            ele.room=="R2" )
            hssbData[ele.slot] = ele;
        else
            gymData [ele.slot] = ele;
    });
    procFinal();
}

ajax.get('//coscup.org/2016-assets/json/room.json')
    .end(function(err, res) {
        var roomData = JSON.parse(res.text);
        procRoomData(roomData);
    }.bind(this));

ajax.get('//coscup.org/2016-assets/json/program.json')
    .end(function(err, res) {
        var progData = JSON.parse(res.text);
        procProgData(progData);
    }.bind(this));


module.exports = {
    getHssbData: function() {
        return hssbData;
    },
    getHssbRoom: function() {
        return hssbRoom;
    },
    getGymData: function() {
        return gymData;
    },
    getGymRoom: function() {
        return gymRoom;
    },
    register: function(callback) {
        if( loaded>=2 )
            callback();
        else
            callbacks.push(callback);
    }
};
