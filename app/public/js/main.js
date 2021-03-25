import weatherMain from "./weather-main.js";
import weatherFav from "./weather-fav.js";
import geolocationApi from "./geolocation-api.js";

let addCityInput = document.getElementById("search-form-input");
let refreshButton = document.getElementById("refresh-button");
let searchForm = document.getElementById("search-form");

refreshButton.addEventListener("click", () => {
    navigator.permissions.query({name:'geolocation'}).then(function(result) {
        if (result.state === 'granted'){
            weatherMain.load();
        }
        else{
            alert("geolocation disabled");
        }
      });
});

searchForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        let city = addCityInput.value;
        addCityInput.value = "";

        weatherFav.addCity(city);
    }
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let city = addCityInput.value;
    addCityInput.value = "";

    weatherFav.addCity(city);
});

weatherMain.load();
weatherFav.load();