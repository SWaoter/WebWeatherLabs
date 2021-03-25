import weatherAPI from "./weather-api.js";
import favouritesAPI from "./fav.js";

const weatherFavourite = {
    load() {
        let fav_list = document.getElementById("list-fav");

        favouritesAPI.getAll()
            .then(res => res.json())
            .then(res => {
                let cities = res.data;
                for (let city of cities) {
                    let weatherI = document.createElement("li");
                    weatherI.setAttribute('class', "weather-container");
                    weatherI.setAttribute('id', `city-${city}`);
                    weatherI.innerHTML = `<p>Loading ${city}...</p>`
                    fav_list.append(weatherI);
                    this.loadCity(city).then(weather => {
                        this.addHtml(weatherI, weather);
                    });
                }
            })
    },

    loadCity(city) {

        return weatherAPI.getByCity(city).then(res => res.json()).then(res => {
            return res.data;
        });
    },

    addCity(city) {
        if (city)
        {
            let fav_list = document.getElementById("list-fav");
            let weathI = document.createElement("li");

            weathI.setAttribute('class', "weather-container");
            weathI.innerHTML = `<p>Loading ${city}...</p>`
            fav_list.append(weathI);

            favouritesAPI.addCity(city)
                .then(res => res.json())
                .then(res => {
                    if (res.message !== "ok") {
                        throw new Error(res.message);
                    }
                    this.loadCity(city)
                        .then(weather => {
                            weathI.setAttribute('id', `city-${weather.city}`);
                            this.addHtml(weathI, weather);
                        })
                })
                .catch(e => {
                    fav_list.removeChild(weathI);
                    alert(e);
                });
        }
        else
        {
            alert("Empty string");
        }
    },

    addHtml(weathI, weatherData) {
        const { name, temperature, pressure, wind, clouds, humidity, coords, icon } = weatherData;

        let html = document.getElementById("weather-fav-tmp").content.cloneNode(true);

        weathI.innerHTML = "";
        weathI.append(html);
        weathI.setAttribute("id", `city-${name}`);

        weathI.getElementsByClassName("img-fav")[0].innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="logo">`;
        weathI.getElementsByClassName("name-fav")[0].innerHTML = `${name}`;
        weathI.getElementsByClassName("temp-fav")[0].innerHTML = `${temperature}°C`;
        weathI.getElementsByClassName("wind-fav")[0].innerHTML = `${wind} m/s`;
        weathI.getElementsByClassName("cloud-fav")[0].innerHTML = `${clouds}%`;
        weathI.getElementsByClassName("press-fav")[0].innerHTML = `${pressure} hpa`;
        weathI.getElementsByClassName("wet-fav")[0].innerHTML = `${humidity}%`;
        weathI.getElementsByClassName("dots-fav")[0].innerHTML = `${coords}`;

        let removeCityButton = weathI.getElementsByClassName("close-button")[0];

        removeCityButton.addEventListener('click', (e) => {
            let button = e.target;
            button.disabled = true;
            favouritesAPI.removeCity(name).then(() => document.getElementById(`city-${name}`).remove()).catch(e => alert(e));
        }).finally(() => {
            button.disabled = false;
        });
    }
};

export default weatherFavourite;