var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var expressValidator = require('express-validator');
var testrouter = require("./routers/test");
let customerRouter = require("./routers/redyassist/customer");
let rateRouter = require("./routers/redyassist/rating");
let cabRouter = require("./routers/redyassist/cabrouter");

let readyassistMiddlware = require("./middleware/readyassistmiddleware");


var config = require("./configs/config");
//making app ready to work with minimal features.
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
app.set("port", process.env.PORT||4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());


// skip token validation for some the apis
app.use(function(req, res, next){
    if(req.url.indexOf("/customer/sendotp")> -1){
        next();
    }else if(req.url.indexOf("/customer/validateotp")> -1){
        next();
    }else{
        readyassistMiddlware.validateToken(req, res,next);
    }
});


app.use("/api/test", testrouter);


//readyassist
app.use("/api/customer",customerRouter );
app.use("/api/rate", rateRouter);
app.use("/api/cab", cabRouter);



app.listen(app.get("port"), function(err){
    if(err){
        console.log("Application failed to start--> ", err);
    }else{
        console.log("Server is listining on PORT: ", app.get("port"));
    }
})
