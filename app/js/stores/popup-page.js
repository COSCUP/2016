require('lib/requestAnimationFrame.js');

var content = null;
var clipboard = '';
var callbacks = [];
var durations = [];

function forward(nowid) {
    window.requestAnimationFrame(callbacks[nowid]);
    if( nowid+1 >= callbacks.length )
        return;
    setTimeout(function() {
        forward(nowid+1);
    }, durations[nowid]);
}

function backward(nowid) {
    window.requestAnimationFrame(callbacks[nowid]);
    if( nowid-1 < 0 )
        return;
    setTimeout(function() {
        backward(nowid-1);
    }, durations[nowid+1]);   
}

module.exports = {
    getContent: function() {
        return content;
    },
    getClipboardText: function() {
        return clipboard;
    },
    show: function(cont, clipboardText) {
        content = cont;
        clipboard = clipboardText || '';
        forward(1);
    },
    close: function() {
        backward(callbacks.length - 1);
    },
    addStep: function(callback, duration) {
        callbacks.push(callback);
        durations.push(duration || 0);
    }
}
