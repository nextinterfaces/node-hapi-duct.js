'use strict';

const Path = require('path');
const Hapi = require('hapi');
const dust = require('dustjs-linkedin');
const dustHelpers = require('dustjs-helpers');
const fs  = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});


// server.register(require('hapi-dust'), (err) => {
//
//     // Hoek.assert(!err, err);
//
//     // server.views({
//     //     engines: {
//     //         html: require('handlebars')
//     //     },
//     //     relativeTo: __dirname,
//     //     path: 'templates'
//     // });
// });

// server.views({
//     engines: { dust: require('hapi-dust') },
//     relativeTo: Path.join(__dirname),
//     path: 'path/to/templates',
//     partialsPath: 'path/to/partials',
//     helpersPath: 'path/to/helpers',
// });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {

        //loading not compiled dust template and output it
        var src =fs.readFileSync(path.join(__dirname, './templates') + '/hello.dust', 'utf8');

        var compiled = dust.compile(src, 'hello');
        dust.loadSource(compiled);
        dust.render('hello', { world: request.params.name }, function(err, out) {
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
