import clear from '../icons/clear.png';
import cloudy from '../icons/cloudy.png';
import fog from '../icons/fog.png';
import partlyCloudyDay from '../icons/partly-cloudy-day.png';
import rainfall from '../icons/rainfall.png';
import snow from '../icons/snow.png';
import rainCloud from '../icons/rain-cloud.png';
import stormyWeather from '../icons/stormy-weather.png';

export default function setWeatherIcon(conditions, iconElement) {
    let url = '';
    switch (conditions.toLowerCase()) {
        case 'clear':
            url = clear
            break;
        case 'cloudy':
            url = cloudy;
            break;
        case 'fog':
            url = fog;
            break;
        case 'partly-cloudy-day':
            url = partlyCloudyDay;
            break;
        case 'rainfall':
            url = rainfall;
            break;
        case 'snow':
            url = snow;
            break;
        case 'rain cloud':
            url = rainCloud;
            break;
        case 'stormy weather':
            url = stormyWeather;
            break;
        default:
            url = clear;  // Default icon
            break;  
    }
    iconElement.innerHTML = '<img src="' + url + '" alt="Clear Day Icon">';
}
