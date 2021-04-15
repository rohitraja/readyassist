
const connection = require("./../../connection");
const async = require("async");
const common = require("./../../common/commonUtil");
const moment =require("moment");


let createDriver = function(mysql, driverData, funcCallback){
    // we can have some validation on driverData
    driverData.registered_on = moment().format("YYYY-MM-DD");
    let query = "INSERT into driver set ?";
    mysql.query(query,[driverData], function(err, result){
        if(err){
            console.error("Error: ", err);
            funcCallback(new Error(err.message));
        }else{
            funcCallback(null, result);
        }
    });
}

let getDriverById = function(mysql, driverId, funcCallback){

    let query = "select * from driver where id = ?";

    mysql.query(query, [driverId], function(err, result){
        if(err){
            funcCallback(new Error(err.message));
        }else{
            funcCallback(null, result);
        }
    })
}

let getDriverByMobile = function(mysql, mobile, funcCallback){

    let query = "select * from driver where mobile = ?";

    mysql.query(query, [mobile], function(err, result){
        if(err){
            funcCallback(new Error(err.message));
        }else{
            funcCallback(null, result);
        }
    })
}
let generateOtpForDriver = function(mysql, mobile, funcCallback){
    let otp = common.generateOTP();
    async.waterfall(
        [function(callback){
            let query = "update driver set otp = ? where mobile = ?";
            mysql.query(query, [otp, mobile], function(err, result){
                if(err){
                    callback(new Error(err.message));
                }else{
                    callback(null);
                }
            });
        },
        function(callback){
            //set otp to customer
            callback(null);
        }],function(err, result){
            if(err){
                funcCallback(err);
            }else{
                funcCallback(null, result);
            }
        }
    )
}

let updateDriverByMobile = function(mysql, mobile, updateObj, funcCallback){

    let query = "update driver set ? where mobile = ?";

    mysql.query(query, [updateObj, mobile], function(err, result){
        if(err){
            funcCallback(new Error(err.message));
        }else{
            funcCallback(null, result);
        }
    })
}




module.exports= {
    createDriver, 
    getDriverById,
    getDriverByMobile,
    generateOtpForDriver,
    updateDriverByMobile
}