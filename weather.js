const countryInput = document.querySelector('.country');
const temperatureSpan = document.querySelector('.temperature');
const humiditySpan = document.querySelector('.humidity');
const windSpeedSpan = document.querySelector('.wind_speed');
const submitButton = document.querySelector('.submit');

// Define an API key
const apiKey = 'bda1bdae2e090e055344e6e112223b5f';

// Function to fetch country weather data
function fetchCountry(country) {
    const trimmedCountry = country.trim();
    if (!trimmedCountry) {
        alert('Please enter a country name.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCountry}&appid=${apiKey}&units=metric`;

    // Display loading message
    temperatureSpan.innerHTML = "Loading...";
    humiditySpan.innerHTML = "";
    windSpeedSpan.innerHTML = "";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Ensure data is present before accessing it
            if (data.main && data.wind) {
                temperatureSpan.innerHTML = `Temperature: ${data.main.temp}°C`; // Using Celsius
                humiditySpan.innerHTML = `Humidity: ${data.main.humidity}%`;
                windSpeedSpan.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
            } else {
                alert('No data found for the specified country.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message); // Show error message to the user
            // Clear loading message
            temperatureSpan.innerHTML = "";
        });
}

// Event listener for submit button
submitButton.addEventListener('click', () => {
    const country = countryInput.value;
    fetchCountry(country);
});
