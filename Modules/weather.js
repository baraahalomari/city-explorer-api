
const axios = require('axios');



class Forecast {
    constructor(item){
        this.date=item.valid_date;
        this.description=`low of ${item.min_temp}, hight of${item.max_temp} with ${item.weather.description}`;
    }
}

function weatherShow(req,res){
    let keyWeather = process.env.WEATHER_API_KEY;
    let cityNameData = req.query.cityName;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityNameData}&key=${keyWeather}&days=3`;
    axios
    .get(weatherUrl)
    .then(item => {
        const weatherArray = item.data.data.map(elem=>{
            return new Forecast(elem)
        }) 
        res.send(weatherArray);
    })
    .catch(error => res.status(500).send(`NOT FOUND ${error}`))
}
module.exports = weatherShow;