let express = require("express");
let router = express.Router();
const ratingService = require("./../../services/readyassist/ratingService");




router.post("/customer", function(req, res){
    let driver_id = req.body._decoded.driver_id;
    if(driver_id!=null){
        ratingService.rateCustomer(req.body,driver_id, function(err, result){
            if(err){
                console.err("Rate error: ", err);
                res.status(500).json({msg: "Something went wrong"});
            }else{
                res.send(200).json({msg: "success"});
            }
        })
    }else{
        res.status(400).json({msg:"Wrong request"})
    }
});

router.post("/driver", function(req, res){
    let customer_id = req.body._decoded.customer_id;

    console.log("logs: ", req.body);
    if(customer_id!=null){
        ratingService.rateDriver(req.body,customer_id, function(err, result){
            if(err){
                console.err("Rate error: ", err);
                res.status(500).json({msg: "Something went wrong"});
            }else{
                res.status(200).json({msg: "success"});
            }
        })
    }else{
        res.status(400).json({msg:"Wrong request"})
    }
});



module.exports = router;
