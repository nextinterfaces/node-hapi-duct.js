# Jump start web skeleton project using
 * Gulp
 * Bower
 * Sass
 * Node.js
 * Hapi.js
 * Duct.js 


#### Setup
```
npm install
bower install
```

#### Using sample Web Server for gulp testing
```
python -m SimpleHTTPServer 9090
```

##### Gulp tasks:
```
gulp clean
gulp watch
gulp build*< -html | -js | -css | -templates >
```

## Running Node & Hapi.js and Dust.js templates
```
node ./server/server.js
```

#### Dust.js templates
```
gulp build-templates
```
Templates are being compiled to dist/ folder and can be reused by both browser client rendering or node server rendering

