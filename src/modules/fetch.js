const APIKey = 'SE5ABZUJNYS5CZV64SP89UQE6';

export default async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${APIKey}&contentType=json`
        );
        
        if (!response.ok) {
            return `OOPs!, sorry ${city} not found`;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        return "Error fetching data. Please try again later.";
    }
}
