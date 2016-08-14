var ajax     = require('superagent');

var spnsData = null;
var slotData = null;
var finalData = [];

var callbacks = [];

function equilJoin(slotData, spnsData) {
    var ret = [];
    slotData.forEach(function(ele) {
        ret[ele.level] = {
            "className": {
                "en": ele.nameen,
                "zh": ele.namezh
            },
            "sponsors": []
        };
    });
    spnsData.forEach(function(ele) {
        ret[ele.level].sponsors.push({
            "place": ele.place,
            "name": {
                "en": ele.nameen,
                "zh": ele.namezh
            },
            "url": ele.logolink,
            "logoUrl": '//coscup.org'+ele.logourl,
            "description": {
                "en": ele.introen,
                "zh": ele.introzh
            }
        });
    });
    ret.forEach(function(ele) {
        ele.sponsors.sort(function(a, b) {
            return a.place > b.place;
        });
    });
    return ret;
}

function procData() {
    if( !slotData || !spnsData )
        return;
    finalData = equilJoin(slotData, spnsData);
    for(var callback of callbacks)
        callback();
    callbacks = [];
}

ajax.get('//coscup.org/2016-assets/json/sponsor.json')
    .end(function(err, res1) {
        spnsData = JSON.parse(res1.text);
        procData();
    }.bind(this));

ajax.get('//coscup.org/2016-assets/json/level.json')
    .end(function(err, res2){
        slotData = JSON.parse(res2.text);
        procData();
    }.bind(this));

module.exports = {
    getData: function() {
        return finalData;
    },
    register: function(callback) {
        if( finalData.length>0 )
            callback();
        else
            callbacks.push(callback);
    }
};
