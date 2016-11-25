'use strict';

const Path = require('path');
const Hapi = require('hapi');
const dust = require('dustjs-linkedin');
const fs = require('fs');
const appDir = Path.dirname(require.main.filename);
const Vision = require('vision');


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});


server.register(Vision, (err) => {
    if (err) {
        console.log("Cannot register vision ");
    }

    server.views({
        engines: {dust: require('hapi-dust')},
        relativeTo: Path.join(__dirname) + '/../',
        path: 'templates',
        partialsPath: 'templates/partials',
        helpersPath: 'templates/helpers'
    });

    // Hoek.assert(!err, err);
});


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('hello', { world: 'Dusting World!' });
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {

        //loading not compiled dust template and outputting it
        var src = fs.readFileSync(Path.join(__dirname, '../templates') + '/hello.dust', 'utf8');

        var compiled = dust.compile(src, 'hello');
        dust.loadSource(compiled);
        dust.render('hello', {world: request.params.name}, function (err, out) {
            console.log(out);
            reply(out);
        });

    }
});


// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
