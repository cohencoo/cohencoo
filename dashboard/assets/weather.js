/*==================================================
 * Access Weather API V1.0
 * Cohen Coombs 2022 
 * Written by Cohen Coombs, 2022
==================================================
weather('Adelaide', function(data) {})
==================================================*/

function round(num, rnd = 0) {
    var p = Math.pow(10, rnd);
    return Math.round(num * p) / p;
}

function weather(city, callback) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=bce6d7a85453f2fb262b62f589f79ff7&units=metric')
    .then(response => response.json())
    .then(data => {
        callback({
            "city": data.name,
            "temperature": data.main.temp+2,
            "max": data.main.temp_max,
            "min": data.main.temp_min,
            "pressure": data.main.pressure,
            "humidity": data.main.humidity,
            "info": data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
            "feels": round(data.main.feels_like, 1),
            "winds": data.wind.gust * 3.6,
            "cloud": data.clouds.all,
        });
    }).catch(err => console.log(err));
};