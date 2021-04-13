const all = {
    env: "DEV", 
    token_key: "XYX",
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
    googleDistanceApiKey:"AIzaSyBiF0gpF0ELqLdArISj-eDdSTVpiPxXgJc",
    googleDistanceApi:{
        // url: "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615,-73.9976592&key=AIzaSyBiF0gpF0ELqLdArISj-eDdSTVpiPxXgJc"
        url: "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric"
        // url: "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyBiF0gpF0ELqLdArISj-eDdSTVpiPxXgJc

    }
}


module.exports= all;