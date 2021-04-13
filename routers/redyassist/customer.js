var express = require("express");
var router = express.Router();
var customerService = require("./../../services/readyassist/customerService");
const async = require("async");
// var test2 = require("../controllers/test2");


router.post("/",function(req,res){
        async.waterfall([
            function(callback){
                let custData = req.body;
                customerService.registerCustomer(custData, function(err, result){
                    if(err){
                        callback(err);
                    }else{
                        callback(err, result);
                    }
                })
            }
        ], function(err, result){
            if(err){
                res.status(400).json({msg: err.message});
            }else{
                res.status(200).json({
                    msg: "success"
                })
            }
        })
});
router.post("/sendotp", function(req, res){
    customerService.sendOTP(req.body.mobile, function(err, response){
        if(err){
            res.status(500).json({msg: "Something went wrong"});
        }else{
            res.status(200).json({msg: "OTP has been sent"});
        }
    })
});
router.post("/validateotp", function(req, res){
    let reqObj = req.body;
    customerService.validateOTPForCustomer(reqObj, function(err, response){
        if(err){
            res.status(500).json({msg: "Something went wrong"});
        }else{
            res.status(200).json(response);
        }
    })
})
router.get("/:name", function(req, res){
    res.send("Hi "+ req.params.name);
});
router.post("/", function(req,res){
    let body = req.body;
    res.send(body);
});

module.exports = router;