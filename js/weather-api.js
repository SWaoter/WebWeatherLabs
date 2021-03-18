const key = "90949eaca4d1948e8aafbb64e348def2";

const weatherAPI = {
    getByLocation(longitude, latitude) {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`);
    },

    getByCity(city) {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    }
};

export default weatherAPI;