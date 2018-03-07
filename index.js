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
app.use(express.static(__dirname));

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyACM0');
const parser = new Readline();
 
port.pipe(parser);
parser.on('data', console.log);
port.write('ROBOT PLEASE RESPOND\n');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/data',dataRoute);

//To server index.html page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);


httpServer.listen(8080);
httpsServer.listen(8443);