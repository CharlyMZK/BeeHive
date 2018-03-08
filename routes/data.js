var express = require('express');
var mockData = require('../mockData.js');
var router = express.Router();
var fs = require('fs');

router.use(function timeLog(req, res, next) {
    console.log('[Data] Route time : ', Date.now());
    next();
});

router.route('/')
    .get(function (req, res) {
        fs.readFile('/tmp/beeData.json', function read(datareq, err) {
            if (err)
                return console.log(err);
            else
                res.send(data);
        });
    })
    .post(function (req, res) {
        res.send('Post request');
    });


router.route('/mock')
    .get(function (req, res) {
        res.send(mockData.generateMockData());
    })
    .post(function (req, res) {
        res.send('Mock post request');
    });

module.exports = router;