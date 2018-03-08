var express = require('express');
var mockData = require('../mockData.js');
var router = express.Router();
var fs = require("fs");

router.use(function timeLog(req, res, next){
    console.log("[Data] Route time : ", Date.now());
    next();
});

router.route("/")
    .get(function(req,res){
        res.send("Data get");
    })
    .post(function(req,res){
        res.send("Post request");
    }
);


router.route("/mock")
    .get(function(req,res){
        res.send(mockData.generateMockData());
    })
    .post(function(req,res){

        fs.appendFile("/tmp/beeData.json", JSON.stringify(req.body), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        }); 
        res.send("Mock post request");
    }
);


module.exports = router;