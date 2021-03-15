import weatherAPI from "./weather-api.js";
import weatherDto from "./weather-dto.js";

const weatherFavourite = {
    load() {
        let fav_list = document.getElementById("list-fav");

        for (let i = 0; i < localStorage.length; i++) {
            let city = localStorage.key(i);
            let weatherItem = document.createElement("li");

            weatherItem.setAttribute('class', "weather-container");
            weatherItem.setAttribute('id', `city-${city}`);
            weatherItem.innerHTML = `<p>Loading ${city}...</p>`

            fav_list.append(weatherItem);

            this.loadCity(city).then(weatherData => {
                this.addHtml(weatherItem, weatherData);
            });
        }
    },

    loadCity(city) {
        return weatherAPI.getByCity(city).then(res => res.json()).then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            return weatherDto.getWeatherData(data);
            }).catch(error => {
            if (error instanceof TypeError) {
                throw new Error("Network error");
            }

            throw error;
        });
    },

    addCity(city) {
        let fav_list = document.getElementById("list-fav");
        let weatherItem = document.createElement("li");

        weatherItem.setAttribute('class', "weather-container");
        weatherItem.innerHTML = `<p>Loading ${city}...</p>`
        fav_list.append(weatherItem);

        this.loadCity(city).then(weatherData => {
            let name = weatherData.name;
            console.log(2);
            if (!localStorage.getItem(name)) {
                console.log(3);
                localStorage.setItem(name, name);

                weatherItem.setAttribute('id', `city-${name}`);

                this.addHtml(weatherItem, weatherData);
            } else {
                alert("The city already exists")
            }
        }).catch(error => {
            alert(error);

            fav_list.removeChild(weatherItem);
        })
    },

    addHtml(weatherItem, weatherData) {
        const {name, temperature, pressure, wind, clouds, humidity, coords, icon} = weatherData;

        let html = document.getElementById("weather-fav-tmp").content.cloneNode(true);

        weatherItem.innerHTML = "";
        weatherItem.append(html);
        weatherItem.setAttribute("id", `city-${name}`);

        weatherItem.getElementsByClassName("img-fav")[0].innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="logo">`;
        weatherItem.getElementsByClassName("name-fav")[0].innerHTML = `${name}`;
        weatherItem.getElementsByClassName("temp-fav")[0].innerHTML = `${temperature}°C`;
        weatherItem.getElementsByClassName("wind-fav")[0].innerHTML = `${wind} m/s`;
        weatherItem.getElementsByClassName("cloud-fav")[0].innerHTML = `${clouds}%`;
        weatherItem.getElementsByClassName("press-fav")[0].innerHTML = `${pressure} hpa`;
        weatherItem.getElementsByClassName("wet-fav")[0].innerHTML = `${humidity}%`;
        weatherItem.getElementsByClassName("dots-fav")[0].innerHTML = `${coords}`;

        let removeCityButton = weatherItem.getElementsByClassName("close-button")[0];

        removeCityButton.addEventListener('click', () => {
            document.getElementById(`city-${name}`).remove();

            localStorage.removeItem(name);
        });
    }
};

export default weatherFavourite;