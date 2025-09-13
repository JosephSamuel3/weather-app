 import fetchData from './fetch.js';
 
 export default class RenderUI {
    constructor(rootElement) {
        this.root = rootElement;
    }  

    pageLayout() {
        const container = document.createElement('div');
        
        const header = document.createElement('header');
        header.classList.add('header');
        header.textContent = 'Weather App';
        container.appendChild(header);
        
        const main = document.createElement('main');
        main.classList.add('main');
        main.innerHTML = `
            <form class="search-form">
                <input type="text" class="search-input" placeholder="Enter city name" required>
                <button type="submit" class="search-button">Search</button>
            </form>
            <div class="weather-info">
                <h2 class="city-name"></h2>
                <p class="temperature"></p>
                <p class="description"></p>
                <p class="humidity"></p>
                <p class="wind-speed"></p>
            </div>
            <div class="future-forecast">
                <h3>Future Forecast</h3>
                <div class="forecast-cards"></div>
            </div>
        `;
        container.appendChild(main);
        this.root.appendChild(container);
    }

    errorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.textContent = message;
        this.root.appendChild(errorDiv);
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    updateCurrentWeather(data) {
        const cityName = this.root.querySelector('.city-name');
        const temperature = this.root.querySelector('.temperature');
        const description = this.root.querySelector('.description');
        const humidity = this.root.querySelector('.humidity');
        const windSpeed = this.root.querySelector('.wind-speed');
        
        cityName.textContent = `City: ${data.resolvedAddress}`;
        temperature.textContent = `Temperature: ${data.currentConditions.temp} °C`;
        description.textContent = `Conditions: ${data.currentConditions.conditions}`;
        humidity.textContent = `Humidity: ${data.currentConditions.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.currentConditions.windspeed} km/h`;
    }

    updateFutureForecast(data) {
        const forecastContainer = this.root.querySelector('.forecast-cards');
        forecastContainer.innerHTML = '';
        data.days.slice(1, 6).forEach(day => {
            const card = document.createElement('div');
            card.classList.add('forecast-card');
            card.innerHTML = `
                <h4>${day.datetime}</h4>
                <p>Temp: ${day.temp} °C</p>
                <p>Conditions: ${day.conditions}</p>
                <p>Humidity: ${day.humidity}%</p>
                <p>Wind Speed: ${day.windspeed} km/h</p>
            `;
            forecastContainer.appendChild(card);
        });
    }

    async defaultLocation(city) {
        try {
            const result = await fetchData(city);
            if (typeof result === 'string') {
                this.errorMessage(result);
            } else {
                this.updateCurrentWeather(result);
                this.updateFutureForecast(result);
            }
        } catch {
            this.errorMessage('Error fetching data. Please try again later.');
        }
    }

    initialize() {
        this.pageLayout();
        this.defaultLocation('Toronto');
        
        const form = this.root.querySelector('.search-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const city = this.root.querySelector('.search-input').value;
            try {
                const data = await fetchData(city);
                if (typeof data === 'string') {
                    this.errorMessage(data);
                } else {
                    this.updateCurrentWeather(data);
                    this.updateFutureForecast(data);
                }
            } catch (error) {
                this.errorMessage('An error occurred while fetching data.');
            }
        });
    }
}