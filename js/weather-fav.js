import weatherAPI from "./weather-api.js";
import weatherDto from "./weather-dto.js";

const weatherFavourite = {
    load() {
        let fav_list = document.getElementById("list-fav");

        for (let i = 0; i < localStorage.length; i++) {
            let city = localStorage.key(i);
            let weathI = document.createElement("li");

            weathI.setAttribute('class', "weather-container");
            weathI.setAttribute('id', `city-${city}`);
            weathI.innerHTML = `<p>Loading ${city}...</p>`

            fav_list.append(weathI);

            this.loadCity(city).then(weatherData => {
                this.addHtml(weathI, weatherData);
            });
        }
    },

    loadCity(city) {
        return weatherAPI.getByCity(city).then(res => res.json()).then(data =>
            {
                if (data.cod !== 200)
                {
                    throw new Error(data.message);
                }

                return weatherDto.getWeatherData(data);
            }).catch(error =>
            {
                if (error instanceof TypeError)
                {
                    throw new Error("Network error");
                }

                throw error;
            });
    },

    addCity(city) {
        let fav_list = document.getElementById("list-fav");
        let weathI = document.createElement("li");

        weathI.setAttribute('class', "weather-container");
        weathI.innerHTML = `<p>Loading ${city}...</p>`
        fav_list.append(weathI);

        this.loadCity(city).then(weatherData => {
            let name = weatherData.name;
            if (!localStorage.getItem(name)) {
                localStorage.setItem(name, name);

                weathI.setAttribute('id', `city-${name}`);

                this.addHtml(weathI, weatherData);
            } else {
                fav_list.removeChild(weathI);
                alert("The city already exists")
            }
        }).catch(error => {
            fav_list.removeChild(weathI);
            alert(error);
        })
    },

    addHtml(weathI, weatherData) {
        const {name, temperature, pressure, wind, clouds, humidity, coords, icon} = weatherData;

        let html = document.getElementById("weather-fav-tmp").content.cloneNode(true);

        weathI.innerHTML = "";
        weathI.append(html);
        weathI.setAttribute("id", `city-${name}`);

        weathI.getElementsByClassName("img-fav")[0].innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="logo">`;
        weathI.getElementsByClassName("name-fav")[0].innerHTML = `${name}`;
        weathI.getElementsByClassName("temp-fav")[0].innerHTML = `${temperature}°C`;
        weathI.getElementsByClassName("wind-fav")[0].innerHTML = `${wind} m/s`;
        weathI.getElementsByClassName("cloud-fav")[0].innerHTML = `${clouds}%`;
        weathI.getElementsByClassName("press-fav")[0].innerHTML = `${pressure} hpa`;
        weathI.getElementsByClassName("wet-fav")[0].innerHTML = `${humidity}%`;
        weathI.getElementsByClassName("dots-fav")[0].innerHTML = `${coords}`;

        let removeCityButton = weathI.getElementsByClassName("close-button")[0];

        removeCityButton.addEventListener('click', () => {
            document.getElementById(`city-${name}`).remove();

            localStorage.removeItem(name);
        });
    }
};

export default weatherFavourite;