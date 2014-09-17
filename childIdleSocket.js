var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

var io = sailsIOClient(socketIOClient);
io.sails.url = 'http://localhost:1337';
io.socket.get('/', function () {
    console.log(arguments);
});