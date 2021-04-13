const express = require("express");

const router = express.Router();
const cabService = require("./../../services/readyassist/cabService");


router.post("/searchcabs", function(req, res){
    let lat = req.body.lat;
    let long = req.body.long;
    let city_id = req.body.city_id;
    cabService.findNearByCabs(city_id,lat,long,function(err, result){
        if(!err){
            res.status(200).json(result);
        }else{
            res.status(400).json({msg: err.message});
        }
    });
    
})


module.exports= router;