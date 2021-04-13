
const connection = require("./../../connection");
const async = require("async");
const common = require("./../../common/commonUtil");


let createCustomer = function(mysql, customerData, funcCallback){
    // we can have some validation on customerData
    let query = "INSERT into customers set ?";
    mysql.query(query,[customerData], function(err, result){
        if(err){
            console.err("Error: ", err);
            funcCallback(new Error(err.message));
        }else{
            funcCallback(null, result);
        }
    });
}

let getCustomerById = function(mysql, customerId, funcCallback){

    let query = "select * from customers where id = ?";

    mysql.query(query, [customerId], function(err, result){
        if(err){
            funcCallback(new Error(err.message));
        }else{
            funcCallback(null, result);
        }
    })
}

let getCustomerByMobile = function(mysql, mobile, funcCallback){

    let query = "select * from customers where mobile = ?";

    mysql.query(query, [mobile], function(err, result){
        if(err){
            funcCallback(new Error(err.message));
        }else{
            funcCallback(null, result);
        }
    })
}
let generateOtpForCustomer = function(mysql, mobile, funcCallback){
    let otp = common.generateOTP();
    async.waterfall(
        [function(callback){
            let query = "update customers set otp = ? where mobile = ?";
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

let updateCustomerByMobile = function(mysql, mobile, updateObj, funcCallback){

    let query = "update customers set ? where mobile = ?";

    mysql.query(query, [updateObj, mobile], function(err, result){
        if(err){
            funcCallback(new Error(err.message));
        }else{
            funcCallback(null, result);
        }
    })
}




module.exports= {
    createCustomer, 
    getCustomerById,
    generateOtpForCustomer,
    getCustomerByMobile,
    updateCustomerByMobile
}