var express = require("express");
var router = express.Router();
var driverService = require("./../../services/readyassist/driverService");
const async = require("async");
// var test2 = require("../controllers/test2");


router.post("/",function(req,res){
        async.waterfall([
            function(callback){
                let driverData = req.body;
                driverService.registerDriver(driverData, function(err, result){
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
    driverService.sendOTP(req.body.mobile, function(err, response){
        if(err){
            res.status(500).json({msg: "Something went wrong"});
        }else{
            res.status(200).json({msg: "OTP has been sent"});
        }
    })
});
router.post("/validateotp", function(req, res){
    let reqObj = req.body;
    driverService.validateOTPForDriver(reqObj, function(err, response){
        if(err){
            res.status(500).json({msg: "Something went wrong"});
        }else{
            res.status(200).json(response);
        }
    })
})


module.exports = router;