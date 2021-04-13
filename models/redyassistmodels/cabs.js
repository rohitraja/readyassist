


let getCabInDistanceRange = function(mysql, city_id, distanc_range,lat, long ,functionCallback){

    let query = `SELECT c.reg_no, c.car_type, c.driver_id, c.cur_lat,c.cur_long, c.city_id, 
                111.045* DEGREES(ACOS(LEAST(1.0, COS(RADIANS(p.latpoint))
               * COS(RADIANS(c.cur_lat))
               * COS(RADIANS(p.longpoint) - RADIANS(c.cur_long))
               + SIN(RADIANS(p.latpoint))
               * SIN(RADIANS(c.cur_lat))))) AS distance_in_km
                FROM cab as c
                JOIN ( SELECT  ?  AS latpoint,  ? AS longpoint) AS p ON 1=1
                WHERE c.city_id = ?
                HAVING distance_in_km < ?
                ORDER BY distance_in_km`;
    mysql.query(query, [lat, long, city_id, distanc_range],function(err, result){
        if(err){
            functionCallback(err);
        }else{
            functionCallback(null, result);
        }
    });  

    //https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyBiF0gpF0ELqLdArISj-eDdSTVpiPxXgJc
}



module.exports = {
    getCabInDistanceRange

}
