
const util = require("./../common/commonUtil");


/**
 * Desc: Middleware to validate the token. 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let validateToken = function(req, res, next){
    if(req.headers["token_access"]!=null){
         util.validateUserToken({token: req.headers["token_access"]}, function(err, result){
             if(err){
                 console.error("validate toek: ", err);
                 res.status(401).json({msg: "Not a valid token"});
             }else{
                req.body["_decoded"]= result;
                next();
             }
         });
    }else{
        res.status(401).json({msg: "token_access header missing"});
    }
}


module.exports = {
    validateToken
}