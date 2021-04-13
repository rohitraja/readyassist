const mysql = require("./../../connection");
const customerModel = require("./../../models/redyassistmodels/customer");
const async = require("async");
const utils = require("./../../common/commonUtil");




let registerCustomer = function(customerData, fuctionCallback){

    async.waterfall([
        function(callback){
            customerModel.getCustomerByMobile(mysql, customerData.mobile, function(err, result){
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
            customerModel.createCustomer(mysql, customerData, function(err, result){
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
    customerModel.updateCustomerByMobile(mysql, mobile, updateObj,function(err, result){
        if(err){
            console.error("Error: ", err);
            functionCallback(err);
        }else{
            console.log("OTP is sent and stored in DB");
            functionCallback(err, result);
        }
    })
}


let validateOTPForCustomer = function(obj, functionCallback){
    customerModel.getCustomerByMobile(mysql, obj.mobile,function(err, result){
        if(err){
            functionCallback(err);
        }else{
            if(result.length!=0 && obj.otp == result[0].otp){
                 utils.generateTokenWithUid({customer_id : result[0].id}, function(err, result){
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
    registerCustomer,
    sendOTP,
    validateOTPForCustomer

}