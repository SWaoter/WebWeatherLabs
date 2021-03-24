import weatherMain from "./weather-main.js";
import weatherFav from "./weather-fav.js";
import geolocationApi from "./geolocation-api.js";

let addCityInput = document.getElementById("search-form-input");
let refreshButton = document.getElementById("refresh-button");
let searchForm = document.getElementById("search-form");

refreshButton.addEventListener("click", () => {
    geolocationApi.update().catch(() => {
       alert("ERROR");
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