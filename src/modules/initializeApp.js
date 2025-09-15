import fetchData from './fetch.js';
import setWeatherIcon from "./iconManage.js";
import { getDayOfWeek, dateFromEpoch } from './dateFormat.js';

export default class RenderUI {
    constructor(rootElement) {
        this.root = rootElement;
    }

    pageLayout() {
        const container = document.createElement('div');
        container.classList.add('container');
        container.innerHTML = `
            <h1>Weather App</h1>

            <!-- Search bar -->
            <form class="search-form">
                <input type="text" class="search-input" placeholder="Enter city..." required>
                <button type="submit">Search</button>
            </form>

            <div class="weather">
            <!-- Left Card -->
                <div class="card">
                    <h2 class="city-name">Toronto</h2>
                    <p class="temperature"></p>
                    <div class="icon"></div>
                    <p class="small-text"></p>

                    <div class="details">
                        <p class="humidity">></p>
                        <p class="wind-speed"></p>
                        <p class="real-feel"></p>
                        <p class="precipitation"></p>
                    </div>
                </div>

                <div class="card forecast"></div>
            </div>
      `;
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

   setDetail(element, label, value) {
        element.innerHTML = ''; // clear
        const labelSpan = document.createElement('span');
        labelSpan.textContent = label;

        const valueSpan = document.createElement('span');
        valueSpan.textContent = value;

        element.appendChild(labelSpan);
        element.appendChild(valueSpan);
    }

    updateCurrentWeather(data) {
        const cityName = this.root.querySelector('.city-name');
        const temperature = this.root.querySelector('.temperature');
        const iconElement = this.root.querySelector('.icon');
        const date = this.root.querySelector('.small-text');
        const precipitation = this.root.querySelector('.precipitation');
        const humidity = this.root.querySelector('.humidity');
        const windSpeed = this.root.querySelector('.wind-speed');
        const realFeel = this.root.querySelector('.real-feel');

        cityName.textContent = data.resolvedAddress;
        temperature.textContent = `${data.currentConditions.temp} °C`;
        iconElement.textContent = '';
        setWeatherIcon(data.currentConditions.icon, iconElement);
        date.textContent = dateFromEpoch(data.currentConditions.datetimeEpoch);
        
        humidity.innerHTML = `<span>Humidity:</span> <span>${data.currentConditions.humidity}%</span>`;
        windSpeed.innerHTML = `<span>Wind Speed:</span> <span>${data.currentConditions.windspeed} km/h</span>`;
        realFeel.innerHTML = `<span>RealFeel:</span> <span>${data.currentConditions.feelslike} °C</span>`;
        precipitation.innerHTML = `<span>Precipitation:</span> <span>${data.currentConditions.precip}%</span>`;
    }

    updateFutureForecast(data) {
        const forecastContainer = this.root.querySelector('.forecast');
        const tittle = document.createElement('h3');
        tittle.textContent = '5-Day Forecast';

        forecastContainer.innerHTML = '';
        forecastContainer.appendChild(tittle);

        data.days.slice(1, 6).forEach(day => {
            const card = document.createElement('div');
            card.classList.add('forecast-day');

            // Icon container
            const iconElement = document.createElement('span');
            iconElement.classList.add('forecast-icon');
            setWeatherIcon(day.icon, iconElement);

            // Date
            const date = document.createElement('span');
            date.textContent = getDayOfWeek(day.datetimeEpoch);

            // Temp
            const temp = document.createElement('span');
            temp.textContent = `${day.temp} °C`;

            // Append elements
            card.appendChild(iconElement);
            card.appendChild(date);
            card.appendChild(temp);

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