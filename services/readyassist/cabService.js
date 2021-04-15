
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
            //get the cabs in the distance circle of config distance range. narrow down the google api calls. 
            //It has the limit range to 100 source and destintation
            cabModle.getCabInDistanceRange(mysql, city_id, config.distance_range, lat, long, function(err, response){
                if(err){
                    callback(err);
                }else{
                    callback(null, response)
                }
            });
        },
        function(result, callback){
            let driverIds = _.map(result,"driver_id");
            //get the rating of above cab drivers. check only for the cabs avalilabe for the ride based on the status.
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
                //call google api to get travel distance and time for cab to reach the destination. 
                distanceFromSorsToDes(latLongs,lat, long).then((data)=>{
                    let destanceMat = [].concat(data.rows);

                    //merge the travel distance to the cabs
                    destanceMat.forEach(function(value, i){
                        console.log("value: ", value);
                        results[i]["road_dis_km"] = value.elements[0].distance.value/1000;
                        results[i]["road_time_min"] = value.elements[0].duration.value/60;
                    });
                    //first sort with the mimimum distance cab the sort on avg_rating
                    let sorted = _.orderBy(results, ["road_dis_km", "avg_rating"], ["asc","desc"]);
                    
                    funCallback(null, sorted);
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
            if(result.length <= 0){
                funCallback(new Error("No cabs were found in rage of X Kms"));
            }else{
                //need to return only one search result. but showing the whole range just to see the rating.
                funCallback(err, result);
            }
        }
    })
}

module.exports= {
    findNearByCabs
}