var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var cors = require('cors');
const spawn = require('threads').spawn;

var options = {
  key: fs.readFileSync('./certificats/ssl.key'),
  cert: fs.readFileSync('./certificats/ssl.crt'),
  requestCert: false,
  rejectUnauthorized: false
};

var app = express();
app.use(cors());

var dataRoute = require("./routes/data.js")


const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyACM0');
const parser = new Readline();
const thread = spawn(function(input, done) {
    port.pipe(parser);
    parser.on('data', console.log);
    port.write('ROBOT PLEASE RESPOND\n');
    done({ string : input.string, integer : parseInt(input.string) });
  });


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/data',dataRoute);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);


httpServer.listen(8080);
httpsServer.listen(8443);