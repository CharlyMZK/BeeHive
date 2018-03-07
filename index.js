var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var cors = require('cors');
//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};

var app = express();
app.use(cors())

var dataRoute = require("./routes/data.js")


const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/tty-usbserial1');
const parser = new Readline();
port.pipe(parser);
parser.on('data', console.log);
port.write('ROBOT PLEASE RESPOND\n');

/*var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/tty.usbserial-A6023L0J", {
parser: serialport.parsers.readline("\n"),
baudrate: 57600
});
 
sp.on("open", function() {
console.log('open');
sp.on('data', function(data) {
console.log('data received: ' + data);
});
});*/

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/data',dataRoute);

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);


httpServer.listen(8080);
//httpsServer.listen(8443);

