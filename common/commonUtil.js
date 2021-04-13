

const config = require("./../configs/redyassystConf");
const jwt = require("jwt-simple");

let generateOTP = function(){
    // return Math.floor(1000 + Math.random() * 9000);
    return 1234;
}

let generateTokenWithUid = function(val, callback) {
    val.days !== undefined && val.days !== null && val.days !== '' ? val.days = val.days : val.days = 30 ;
    let dateObj = new Date();
    let expires = dateObj.setDate(dateObj.getDate() + val.days) ; // 7 days
    let params = {exp : expires};
    if(val.customer_id !== undefined  && val.customer_id !== null && val.customer_id !== "") params.customer_id = val.customer_id; else val.customer_id = null;
    if(val.driver_id !== undefined && val.driver_id !== null && val.driver_id !== "" ) params.driver_id = val.driver_id ; else val.driver_id = null;
    let token = jwt.encode(params, config.token_key);
    callback (null, { token: token, expires: expires});
}

//Validate Token
let validateUserToken = function(val, callback){
    if (val.token) {
        try {
            let decoded = jwt.decode(val.token, config.token_key);
            if (decoded.exp <= Date.now() ) {
                callback(new Error('Token Expired'), {"status": 401, "message": "Token Expired"});
            }else{
                callback(null, {customer_id : decoded.customer_id, driver_id : decoded.driver_id});
            }
        } catch (err) {
            callback(new Error('Oops something went wrong'),{"status": 401, "message": "Oops something went wrong", "error": err});
        }
    } else {
        callback(new Error('Invalid Token or Key'),{"status": 401, "message": "Invalid Token"});
    }
}



module.exports= {
    generateOTP,
    generateTokenWithUid,
    validateUserToken
}