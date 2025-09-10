const APIKey = 'SE5ABZUJNYS5CZV64SP89UQE6';

async function fetchWeather(city) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${APIKey}&contentType=json`);
    if (!response.ok) {
        throw new Error('City not found');
    }
    const data = await response.json();
    return data;
}
export default fetchWeather;