var express = require('express');
var mockData = require('../mockData.js');
var router = express.Router();



router.use(function timeLog(req, res, next){
    console.log("[Data] Route time : ", Date.now());
    next();
});

router.route("/")
    .get(function(req,res){
        res.send(mockData.generateMockData());
    })
    .post(function(req,res){
        var data = req.body.data;
        console.log(data);
        res.send("Post request");
    }
);


module.exports = router;