const weatherAPI = {
    getByLocation(longitude, latitude) {
        return fetch(`/weather/coordinates?longitude=${longitude}&latitude=${latitude}`);
    },

    getByCity(city) {
        return fetch(`/weather/city?city=${city}`);
    }
};

export default weatherAPI;