var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

var io = sailsIOClient(socketIOClient);
io.sails.url = 'http://localhost:1337';

function bench(done, parallel) {

    var requests = 0;
    var duration = 3 * 1000;
    var start    = Date.now();
    var hasDone  = false;

    function run () {
        io.socket.get('/', function () {

            requests++;
            if (Date.now() - start < duration) {
                run(done);
            } else if (!hasDone) {
                hasDone = true;
                console.log('Requests per second at ' + parallel + ' concurrency: ' + Math.round(requests / duration * 1000));
                done();
            }

        });
    }

    for (var i = 0; i < parallel; i++) {
        run();
    }
};

bench(function () {
    bench(function () {
        bench(function () {
            bench(function () {
                process.exit(1);
            }, 100);
        }, 25);
    }, 5);
}, 1);