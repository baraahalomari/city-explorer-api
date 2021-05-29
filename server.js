'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./assets/weather.json');
const axios = require('axios');

const server = express();
server.use(cors());

const PORT = process.env.PORT;



server.get('/weather',weatherShow)

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

server.get('/movie',movieShow);

class Movie{
    constructor(item){
        this.releaseData = item.release_date;
        this.title=item.original_title;
        this.totalVotes=item.vote_count;
        this.imgPath=`https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.overview = item.overview;
        this.avgVotes = item.vote_average;
        this.popularity = item.popularity;
    }
}

function movieShow (req,res){
    let movieKey = process.env.MOVIES_API_KEY;
    let nameMovie = req.query.cityName;
    let urlMovie =`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${nameMovie}`;

    axios
    .get(urlMovie)
    .then(item =>{
        const arrMovie = item.data.results.map(ele=>{
            return new Movie(ele);
        })
        res.send(arrMovie);
    })
    .catch(error=>{
        res.status(500).send(`NOT FOUND ${error}`);
    })
}

// server.get('/weather',(req,res)=>{
//    let cityNameData = req.query.cityName;
//    let lat = req.query.lat;
//    let lon = req.query.lon;
//     let searchQuery = weatherData.find(item=>{
//         if (cityNameData.toLowerCase() == item.city_name.toLowerCase() )
//         return item;
//     })
    

//     try {
//         let forcastArr = [];
//         let date;
//         let description;
//         let forcastData;
//         for(let i =0 ; i<searchQuery.data.length; i++){
//             date = searchQuery.data[i].valid_date;
//             description=`Low of ${searchQuery.data[i].low_temp}, high of ${searchQuery.data[i].max_temp} with ${searchQuery.data[i].weather.description}`;
//             forcastData = new Forecast(date,description);
//             forcastArr.push(forcastData);
//         }
//         res.send(forcastArr);
//     } catch (par){
        
//         res.send('error not found');
//     }
    
// })



server.listen(PORT, ()=>{
    console.log(`listtening on PORT ${PORT}`)
})