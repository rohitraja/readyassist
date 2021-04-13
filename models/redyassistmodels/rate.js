let createRating = function(mysql, ratingData, funcCallback){
    // we can have some validation on customerData
    let query = "INSERT into rating set ?";
    mysql.query(query,[ratingData], function(err, result){
        if(err){
            console.err("Error: ", err);
            funcCallback(new Error(err.message));
        }else{
            funcCallback(null, result);
        }
    });
}

let getRatings = function(mysql, user_id, user_type, funcCallback){
    let query = "select * from rating where user_id = ? and user_type = ?";

    mysql.query(query, [user_id, user_type], function(err, response){
        if(err){
            funcCallback(err);
        }else{
            funcCallback(null, response);
        }
    })
};


let getAvgRatings = function(mysql, user_id, user_type, funcCallback){
    let query = "select avg(rating) as avg_rating from rating where user_id = ? and user_type = ?";

    mysql.query(query, [user_id, user_type], function(err, response){
        if(err){
            funcCallback(err);
        }else{
            funcCallback(null, response);
        }
    })
};

let getAvgRatingByDIds = function(mysql, ids, funcCallback){
    let query = "select user_id, avg(rating) as avg_rating from rating where user_type = 'DRIVER' group by user_id having user_id in (?)";
    mysql.query(query,[ids], function(err, result){
        if(err){
            funcCallback(err);
        }else{
            funcCallback(null, result);
        }
    })
}


module.exports= {
    createRating, 
    getRatings,
    getAvgRatings,
    getAvgRatingByDIds
}