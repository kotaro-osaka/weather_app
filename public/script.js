const weatherForm = document.getElementById('weather-form');
const weatherDataDiv = document.getElementById('weather-data');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const city = document.getElementById('city').value;

    // Use fetch API to send a POST request to the server
    fetch('/weather', {
        method: 'POST',
        body: JSON.stringify({ city: city }) // Send city data in request body
    })
    .then(response => response.json()) // Parse JSON response from server
    .then(data => {
        const city = data.name;
        const temperature = Math.floor(data.main.temp - 273.15); // Convert Kelvin to Celsius
        const weatherDescription = data.weather[0].description;

        const weatherDataDiv = document.getElementById('weather-data');
        weatherDataDiv.innerHTML = ``; // Clear any previous content
        weatherDataDiv.innerHTML += `<h2>Weather in ${city}</h2>`;
        weatherDataDiv.innerHTML += `<p>Temperature: ${temperature} °C</p>`;
        weatherDataDiv.innerHTML += `<p>Description: ${weatherDescription}</p>`;
    }) 
    .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherDataDiv.textContent = 'Error retrieving weather data';
    });
});