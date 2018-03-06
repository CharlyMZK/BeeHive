var express = require('express');
var router = express.Router();
router.use(function timeLog(req, res, next){
    console.log("[Data] Route time : ", Date.now());
    next();
});

router.route("/")
    .get(function(req,res){
        res.send("Get request");
    })
    .post(function(req,res){
        res.send("Post request");
    }
);


module.exports = router;