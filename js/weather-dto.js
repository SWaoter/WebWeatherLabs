const weatherDto = {
    getWeatherData(responseData) {
        return {
            name: responseData.name,
            temperature: Math.round(responseData.main.temp),
            pressure: responseData.main.pressure,
            humidity: responseData.main.humidity,
            wind: responseData.wind.speed,
            clouds: responseData.clouds.all,
            coords: `[${responseData.coord.lon}, ${responseData.coord.lat}]`,
            icon: responseData.weather[0].icon
        }
    }
};

export default weatherDto;