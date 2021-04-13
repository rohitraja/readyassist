
const cabModle = require("./../../models/redyassistmodels/cabs");
const ratingModel = require("./../../models/redyassistmodels/rate");
const requestpromise = require("request-promise");
const config = require("./../../configs/redyassystConf");
const asyncLib = require("async");
const mysql = require("./../../connection");
const _ = require("lodash");
const _join = require("lodash-joins");


/**
 * @param {Array} latLongs The date
 * @param {double} des_lat The string
 * @param {double} des_long The string
 */
async function distanceFromSorsToDes (latLongs, des_lat, des_long){
    let latLongJoin = latLongs.join("|");
    let url = config.googleDistanceApi.url+"&origins="+latLongJoin+"&destinations="+des_lat+","+des_long+"&key="+config.googleDistanceApiKey;
    console.log("URL formd: ", url);
    return await requestpromise({
        url,
        method:"GET",
        json: true
    });

}

let findNearByCabs = function(city_id, lat, long, funCallback){

    asyncLib.waterfall([
        function(callback){
            cabModle.getCabInDistanceRange(mysql, city_id, 10, lat, long, function(err, response){
                if(err){
                    callback(err);
                }else{
                    callback(null, response)
                }
            });
        },
        function(result, callback){
            let driverIds = _.map(result,"driver_id");
            ratingModel.getAvgRatingByDIds(mysql, driverIds,function(err, ratings){
                console.log("ratings: ", ratings);
                if(!err){
                    result = _join.hashInnerJoin(result, "driver_id", ratings, "user_id");
                    callback(null, result);
                }else{
                    callback(err);
                }
            })
        },
        function(results, callback){
            console.log("With Ragin: ", results);
            if(results.lenght==0){
                callback(new Error("No cabs found in search range"));
            }else{
                let latLongs =[];
                results.forEach(element => {
                    let latlong =[];
                    latlong.push(element.cur_lat);
                    latlong.push(element.cur_long);
                    latLongs.push(latlong);
                });
                distanceFromSorsToDes(latLongs,lat, long).then((data)=>{
                    console.log("distances: ", data);
                    funCallback(null, data);
                })
                .catch((reason)=>{
                    funCallback(new Error(reason));
                });
            }

            
        }
    ],function(err, result){
        if(err){
            console.error("Error: ", err);
            funCallback(err);
        }else{
            funCallback(err, result);
        }
    })

}

module.exports= {
    findNearByCabs
}