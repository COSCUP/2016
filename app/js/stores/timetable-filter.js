// map id to tag info
var loader = require('dataloaders/schedules-filter.js');
var types  = {};

var placesData = [
    {id: 0, en: "H.S.S. Building", zh: "人文館"},
    {id: 1, en: "Activity Center", zh: "活動中心"}
];

// sieve, cnt do the same thing as Set
var sieve  = {};
var cnt    = 0;
var placeid= 0;

var filterChangeCallbacks = [];
var placeChangeCallbacks  = [];

var store = {
    getAllTypes: function() {
        return types;
    }, 
    getAllPlaces: function() {
        return placesData;
    },
    // Return whether a filter was picked or not
    filter: function(id) {
        if( cnt==0 ) return true;
        if( typeof sieve[id] === 'undefined' )
            return false;
        return sieve[id];
    },
    sieve : function(id) {
        if( sieve[id] ) return true;
        else return false
    },
    // Map id to tag info
    type: function(id) {
        if( types[id] )
            return types[id];
        else
            return {nameen: '', namezh: ''};
    },
    nowPlace: function() {
        return placeid;
    },
    filterToggle: function(id) {
        if( sieve[id] ) {
            sieve[id] = false;
            --cnt;
        }
        else {
            sieve[id] = true;
            ++cnt;
        }
        this.emitFilterChange();
    },
    setPlace: function(val) {
        if( placeid!=val ) {
            placeid = val;
            this.emitPlaceChange();
        }
    },

    filterChangeRegister: function(callback) {
        filterChangeCallbacks.push(callback);
    },
    placeChangeRegister: function(callback) {
        placeChangeCallbacks .push(callback);
    },
    emitFilterChange: function() {
        for(var callback of filterChangeCallbacks)
            callback();
    },
    emitPlaceChange: function() {
        for(var callback of placeChangeCallbacks)
            callback(placeid);
    }
};

loader.register(function() {
    types = loader.getTypes();
    store.emitFilterChange();
});

module.exports = store;
