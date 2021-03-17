import geolocationApi from "./geolocation-api.js";
import weatherAPI from "./weather-api.js";
import weatherDto from "./weather-dto.js";

const weatherMain = {
    load() {
        geolocationApi.update().then(() => {
            let loc = geolocationApi.getLocation();
            let long = loc.longitude;
            let lat = loc.latitude;

            weatherAPI.getByLocation(long, lat).then(res => res.json()).then(data => {
                let weatherData = weatherDto.getWeatherData(data);
                this.addHtml(weatherData);
            }).catch((error) => {
                alert(error);
            });
        });
    },

    addHtml(weatherData) {
        const {name, temp, press, wind, cloud, wet, dots, icon} = weatherData;

        let weatherHereBody = document.getElementById("weather-main");
        let html = document.getElementById("weather-main-tmp").content.cloneNode(true);

        weatherHereBody.innerHTML = "";
        weatherHereBody.append(html);

        document.getElementById("img-main").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="logo">`;
        document.getElementById("name-main").innerHTML = `${name}`;
        document.getElementById("temp-main").innerHTML = `${temp}°C`;
        document.getElementById("wind-main").innerHTML = `${wind} m/s`;
        document.getElementById("cloud-main").innerHTML = `${cloud}%`;
        document.getElementById("press-main").innerHTML = `${press} hpa`;
        document.getElementById("wet-main").innerHTML = `${wet}%`;
        document.getElementById("dots-main").innerHTML = `${dots}`;
    },
};

export default weatherMain;