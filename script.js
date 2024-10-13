
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const getWeatherBtn = document.getElementById('getWeatherBtn');
const locationInput = document.getElementById('locationInput');
const weatherResult = document.getElementById('weatherResult');
const locationName = document.getElementById('locationName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Function to fetch weather data
async function fetchWeather(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('Location not found');
    }
    return response.json();
}

// Function to display weather data
function displayWeather(data) {
    locationName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    weatherDescription.textContent = `Condition: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherResult.style.display = 'block';
}

// Function to handle button click
getWeatherBtn.addEventListener('click', async () => {
    const location = locationInput.value;
    if (location) {
        try {
            const weatherData = await fetchWeather(location);
            displayWeather(weatherData);
        } catch (error) {
            alert(error.message);
            weatherResult.style.display = 'none';
        }
    }
});

// Optional: Get user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            const weatherData = await response.json();
            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    });
}


