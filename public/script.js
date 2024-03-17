const searchBar = document.getElementById('search-bar');
const cityInput = document.getElementById('city-input');
const city = document.getElementById('city');
 
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

searchBar.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    fetchWeatherData(cityInput.value);
});

// Default city
// fetchWeatherData('Osaka');


// Distribute data function

//use oninput for city suggestions


const showSearchBar = () => {
    city.style.display = 'none';
    document.getElementById('show-search-bar').style.display = 'none';
    searchBar.style.display = 'flex';
    cityInput.focus();
}

const checkCityInputState = () => {
    if (window.matchMedia('(max-width: 629px)').matches) {
        city.style.display = 'block';
        document.getElementById('show-search-bar').style.display = 'flex';
        searchBar.style.display = 'none';
    }
}

window.addEventListener('resize', () => {
    if (window.innerWidth >= 740) {
        city.style.whiteSpace = 'nowrap';
        document.querySelector('#current-location p').style.display = 'flex';
    } else if (window.innerWidth >= 629 && window.innerWidth <= 739) {
        document.getElementById('show-search-bar').style.display = 'none';
        searchBar.style.display = 'flex';
        document.querySelector('#current-location p').style.display = 'none'; 
    } else if (window.innerWidth >= 500 && window.innerWidth <= 628) {
        city.style.display = 'block';
        city.style.whiteSpace = 'nowrap';
        document.getElementById('show-search-bar').style.display = 'flex';
        searchBar.style.display = 'none';
    } else {
        city.style.whiteSpace = 'wrap';
    }
});