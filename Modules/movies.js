const axios = require('axios');




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

let inMemory ={};

function movieShow (req,res){
    let movieKey = process.env.MOVIES_API_KEY;
    let nameMovie = req.query.cityName;

    if (inMemory[nameMovie] !== undefined ){
        console.log('get the data from memory');
        res.send(inMemory[nameMovie])
    } else {
        console.log('get data from API');
     let urlMovie =`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${nameMovie}`;

    axios
    .get(urlMovie)
    .then(item =>{
        const arrMovie = item.data.results.map(ele=>{
            return new Movie(ele);
        })
        inMemory[nameMovie]=arrMovie;
        res.send(arrMovie);
        })
            .catch(error=>{
                res.status(500).send(`NOT FOUND ${error}`);
            })
    }
     
}
module.exports = movieShow;