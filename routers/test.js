var express = require("express");
var router = express.Router();
// var test2 = require("../controllers/test2");


router.get("/",function(req,res){
    res.send({status: 200, msg: "Hi every one"});
});
router.get("/:name", function(req, res){
    res.send("Hi "+ req.params.name);
});
router.post("/", function(req,res){
    let body = req.body;
    res.send(body);
});

module.exports = router;

