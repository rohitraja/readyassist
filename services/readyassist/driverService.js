const mysql = require("./../../connection");
const driverModle = require("./../../models/redyassistmodels/driver");
const async = require("async");
const utils = require("./../../common/commonUtil");




let registerDriver = function(driverData, fuctionCallback){

    async.waterfall([
        function(callback){
            driverModle.getDriverByMobile(mysql, driverData.mobile, function(err, result){
                if(err){
                    callback(err);
                }else{
                    if(result.length >0){
                        callback(new Error("Customer with this moible no already exist"));
                    }else{
                        callback(null);
                    }
                }
            })
        },
        function(callback){
            driverModle.createDriver(mysql, driverData, function(err, result){
                if(err){
                    callback(err);
                }else{
                    callback(null, result);
                }
            })
        }
    ], function(err, result){
        if(err){
            fuctionCallback(err);
        }else{
            fuctionCallback(null, result);
        }
    })  

}

let sendOTP = function(mobile, functionCallback){
    let otp = utils.generateOTP();
    let updateObj = {otp}
    driverModle.updateDriverByMobile(mysql, mobile, updateObj,function(err, result){
        if(err){
            console.error("Error: ", err);
            functionCallback(err);
        }else{
            console.log("OTP is sent and stored in DB");
            functionCallback(err, result);
        }
    })
}


let validateOTPForDriver = function(obj, functionCallback){
    driverModle.getDriverByMobile(mysql, obj.mobile,function(err, result){
        if(err){
            functionCallback(err);
        }else{
            if(result.length!=0 && obj.otp == result[0].otp){
                 utils.generateTokenWithUid({driver_id : result[0].id}, function(err, result){
                    if(err){
                        functionCallback(err);
                    }else{
                        functionCallback(null, result);
                    }
                });
                
            }else{
                functionCallback(new Error("Customer not found"));
            }
        }
    })
}

module.exports = {
    registerDriver,
    sendOTP,
    validateOTPForDriver
}