'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./assets/weather.json');


const server = express();
server.use(cors());

const PORT = process.env.PORT;

class Forecast {
    constructor(date,description){
        this.date=date;
        this.description=description;
    }
}

server.get('/weather',(req,res)=>{
   let cityNameData = req.query.cityName;
   let lat = req.query.lat;
   let lon = req.query.lon;
    let searchQuery = weatherData.find(item=>{
        if (cityNameData.toLowerCase() == item.city_name.toLowerCase() )
        return item;
    })
    

    try {
        let forcastArr = [];
        let date;
        let description;
        let forcastData;
        for(let i =0 ; i<searchQuery.data.length; i++){
            date = searchQuery.data[i].valid_date;
            description=`Low of ${searchQuery.data[i].low_temp}, high of ${searchQuery.data[i].max_temp} with ${searchQuery.data[i].weather.description}`;
            forcastData = new Forecast(date,description);
            forcastArr.push(forcastData);
        }
        res.send(forcastArr);
    } catch (par){
        
        res.send('error not found');
    }
    
})



server.listen(PORT, ()=>{
    console.log(`listtening on PORT ${PORT}`)
})