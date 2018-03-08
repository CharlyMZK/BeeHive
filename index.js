var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var cors = require('cors');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

var options = {
  key: fs.readFileSync('./certificats/ssl.key'),
  cert: fs.readFileSync('./certificats/ssl.crt'),
  requestCert: false,
  rejectUnauthorized: false
};

var app = express();
app.use(cors());

var dataRoute = require("./routes/data.js")

if (cluster.isMaster) {
    console.log(`Server (${process.pid}) is running`);
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use('/data',dataRoute);
    
    var httpServer = http.createServer(app);
    var httpsServer = https.createServer(options, app);

    httpServer.listen(8080);
    httpsServer.listen(8443);
    
    // Fork workers.
    for (let i = 0; i < 1; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    const SerialPort = require('serialport');
    const Readline = SerialPort.parsers.Readline;
    const port = new SerialPort('/dev/ttyACM0');
    const parser = new Readline();
    port.pipe(parser);
    parser.on('data', console.log);
    //port.write('ok\n');
    console.log(`Serial port listener (${process.pid}) is running`);
  }


