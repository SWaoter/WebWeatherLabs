import geolocationApi from "./geolocation-api.js";
import weatherAPI from "./weather-api.js";
import weatherDto from "./weather-dto.js";

const weatherMain = {
    load() {
        geolocationApi.update().then(() => {
            let location = geolocationApi.getLocation();
            let longitude = location.longitude;
            let latitude = location.latitude;

            weatherAPI.getByLocation(longitude, latitude).then(res => res.json()).then(data => {
                let weatherData = weatherDto.getWeatherData(data);
                this.addHtml(weatherData);
            }).catch((error) => {
                alert(error);
            });
        });
    },

    addHtml(weatherData) {
        const {name, temperature, pressure, wind, clouds, humidity, coords, icon} = weatherData;

        let weatherHereBody = document.getElementById("weather-main");
        let html = document.getElementById("weather-main-tmp").content.cloneNode(true);

        weatherHereBody.innerHTML = "";
        weatherHereBody.append(html);

        document.getElementById("img-main").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="logo">`;
        document.getElementById("name-main").innerHTML = `${name}`;
        document.getElementById("temp-main").innerHTML = `${temperature}°C`;
        document.getElementById("wind-main").innerHTML = `${wind} m/s`;
        document.getElementById("cloud-main").innerHTML = `${clouds}%`;
        document.getElementById("press-main").innerHTML = `${pressure} hpa`;
        document.getElementById("wet-main").innerHTML = `${humidity}%`;
        document.getElementById("dots-main").innerHTML = `${coords}`;
    },
};

export default weatherMain;