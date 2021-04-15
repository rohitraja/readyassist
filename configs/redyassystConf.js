const all = {
    env: "DEV", 
    token_key: "XYXX",
    distance_range: 10,
    dbConf:{
        master:{
            host: 'localhost',
            user: 'root',
            password: 'mynewpassword',
            database: 'readyassist',
            timezone: 'utc',
            connectionLimit: 10
        }
    },
    googleDistanceApiKey:process.env.gMapApi,
    googleDistanceApi:{
        url: "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric"

    }
}
module.exports= all;