function fetchWeatherData(city) {
    // const weatherDataDiv = document.getElementById('weather-data');

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: city })
    })
    .then(response => response.json()) // Parse JSON response from server
    .then(data => {
        const city = data.name;
        const temperature = Math.floor(data.main.temp - 273.15); // Convert Kelvin to Celsius
        const weatherDescription = data.weather[0].description;

        // weatherDataDiv.innerHTML = '';
        // weatherDataDiv.innerHTML += `<h2 class="display-medium on-background-text">${city}</h2>`;
        // weatherDataDiv.innerHTML += `<p class="label-large on-background-text">Temperature: ${temperature} °C</p>`;
        // weatherDataDiv.innerHTML += `<p class="label-large on-background-text">Description: ${weatherDescription}</p>`;
    }) 
    .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherDataDiv.textContent = 'Error retrieving weather data';
    });
}

document.getElementById('search-bar').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    fetchWeatherData(document.getElementById('city-input').value);
});

// Default city
// fetchWeatherData('Osaka');


// Distribute data function

//use oninput for city suggestions


const showSearchBar = () => {
    document.getElementById('city').style.display = 'none';
    document.getElementById('show-search-bar').style.display = 'none';
    document.getElementById('search-bar').style.display = 'flex';
    document.getElementById('city-input').focus();
}

const checkCityInputState = () => {
    if (window.matchMedia('(max-width: 629px)').matches) {
        document.getElementById('city').style.display = 'block';
        document.getElementById('show-search-bar').style.display = 'flex';
        document.getElementById('search-bar').style.display = 'none';
    }
}

window.addEventListener('resize', () => {
    if (window.innerWidth >= 740) {
        document.getElementById('city').style.whiteSpace = 'nowrap';
        document.querySelector('#current-location p').style.display = 'flex';
    } else if (window.innerWidth >= 629 && window.innerWidth <= 739) {
        document.getElementById('show-search-bar').style.display = 'none';
        document.getElementById('search-bar').style.display = 'flex';
        document.querySelector('#current-location p').style.display = 'none'; 
    } else if (window.innerWidth >= 500 && window.innerWidth <= 628) {
        document.getElementById('city').style.display = 'block';
        document.getElementById('city').style.whiteSpace = 'nowrap';
        document.getElementById('show-search-bar').style.display = 'flex';
        document.getElementById('search-bar').style.display = 'none';
    } else {
        document.getElementById('city').style.whiteSpace = 'wrap';
    }
});