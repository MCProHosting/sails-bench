var spawn = require('child_process').spawn;


function bench(done, parallel) {

    var open = 0;

    function run () {
        var proc = spawn('node', ['childIdleSocket.js']);
        proc.stdout.on('data', function (data) {
            if (++open === parallel) {
                console.log(parallel + ' sockets are now open.');
            }
        });
    }

    for (var i = 0; i < parallel; i++) {
        run();
    }
};

bench(function () {

}, 100);