/* global __dirname */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');


const PORT = 8080;
//const ROOT = path.resolve(__dirname, 'build/development');
const ROOT = path.resolve(__dirname, 'build/production');

const RESOURCES = {
  '/bundle.js': fs.readFileSync(path.resolve(ROOT, 'bundle.js')),
  '/bundle.js.map': fs.readFileSync(path.resolve(ROOT, 'bundle.js.map')),
  '/index.html': fs.readFileSync(path.resolve(ROOT, 'index.html')),
  '/style.css': fs.readFileSync(path.resolve(ROOT, 'style.css')),
  '/style.css.map': fs.readFileSync(path.resolve(ROOT, 'style.css.map'))
};

const MIME_TYPES = {
  '/bundle.js': 'text/javascript',
  '/bundle.js.map': 'application/octet-stream',
  '/index.html': 'text/html',
  '/style.css': 'text/css',
  '/style.css.map': 'application/octet-stream'
};

const DEFAULT_RESOURCE = '/index.html';


fs.watch(ROOT, 'UTF-8', (eventType, filename) => {
  let resname = '/' + filename;  
  if (resname in RESOURCES) {
    fs.readFile(path.resolve(ROOT, filename), (err, data) => {
      if (err) throw err;
      RESOURCES[resname] = data;
      console.log(`File ${filename} reloaded`);
    });
  }
});


const server = new http.Server();

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.on('request', (req, resp) => {
  if (req.method === 'GET') {
    let pathname = url.parse(req.url).pathname;    
    if (pathname) {      
      resp.writeHead(200, {'Content-Type': MIME_TYPES[pathname] || MIME_TYPES[DEFAULT_RESOURCE] });
      resp.end(RESOURCES[pathname] || RESOURCES[DEFAULT_RESOURCE]);
    } else {
      resp.end('HTTP/1.1 404 Not Found\r\n\r\n');
    }
  } else {
    resp.end('HTTP/1.1 405 Method Not Allowed\r\n\r\n');    
  }  
});

server.listen(PORT);

console.log('Server started on port ' + PORT);