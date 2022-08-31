const {URL} = require('url');
const fetch = require("node-fetch");
const movies = require('../data/movies.json');
require("dotenv").config();

// http://www.omdbapi.com/?i=tt3896198&apikey=eb504316

exports.handler = async () => {
    const api = new URL('https://www.omdbapi.com/');
    api.searchParams.set('apikey', process.env.OMDB_API_KEY);

    const promises = movies.map((movie) => {
        api.searchParams.set('i', movie.id);
        return fetch(api).then((res) => res.json())
            .then((data) => {
            console.log("data", data)
            const scores = data.Ratings;
            return {
                ...movie,
                scores
            }
        })
    })

    const movieWithRatings = await Promise.all(promises);

    return {
        statusCode: 200,
        body: JSON.stringify(movieWithRatings)
    }
}