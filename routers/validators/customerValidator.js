module.exports = {

    validateOTP : function (req,res,next) {
        req.checkBody('mobile').notEmpty().withMessage('Mobile No. is required').isNumeric().withMessage('mobile  Should be Integer');
        req.checkBody('otp').notEmpty().withMessage('Please pass the otp').isNumeric().withMessage('OTP is Shoulde Integer');
        var errors = req.validationErrors();
        if(errors) {
            return res.status(200).json({
                status : 400,
                msg : "Bad Request",
                results : errors
            });
        } else {
            return next();
        }
    },
    validateBody : function (req,res,next) {
        //do some validation
        var errors = req.validationErrors();
        if(errors) {
            return res.status(200).json({
                status : 400,
                msg : "Bad Request",
                results : errors
            });
        } else {
            return next();
        }
    },
};