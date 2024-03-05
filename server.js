const express = require('express');
const http = require('http');
require('dotenv').config();

const app = express();

const apiKey = process.env.API_KEY;

// Parse form data POST request and assign to req.body.city
app.use(express.urlencoded({ extended: true })); // Parse extended forms' more complex data structures

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/weather', (req, res) => {
    const city = req.body.city || 'Osaka';

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    http.get(url, (response) => {
        let weatherData = '';

        response.on('data', (chunk) => {
            weatherData += chunk;
        });

        response.on('end', () => {
            try {
                const weatherObject = JSON.parse(weatherData);
                res.json(weatherObject);
            } catch (error) {
                console.error('Error parsing weather data:', error);
                res.status(500).send('Error retrieving weather data');
            }
        });
    }).on('error', (error) => {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error retrieving weather data');
    });
});

module.exports = app;