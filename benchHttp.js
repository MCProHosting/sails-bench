var http = require('http');

var options = {
  host: '127.0.0.1',
  port: 1337,
  path: '/'
};

function bench(done, parallel) {

    var requests = 0;
    var duration = 3 * 1000;
    var start    = Date.now();
    var hasDone  = false;

    function run () {
        http.request(options, function (response) {
            
            response.on('data', function () {});
            response.on('end', function () {

                requests++;
                if (Date.now() - start < duration) {
                    run(done);
                } else if (!hasDone) {
                    hasDone = true;
                    console.log('Requests per second at ' + parallel + ' concurrency: ' + Math.round(requests / duration * 1000));
                    done();
                }

            });
        }).end();
    }

    for (var i = 0; i < parallel; i++) {
        run();
    }
};

bench(function () {
    bench(function () {
        bench(function () {
            bench(function () {

            }, 100);
        }, 25);
    }, 5);
}, 1);