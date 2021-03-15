let longitude =  "30.3136768";
let latitude = "59.998208";

const geolocationApi = {
    update() {
        return new Promise((res) => {
            navigator.geolocation.getCurrentPosition(function(position) {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
                console.log(geolocationApi.getLocation());
                res();
            });
        });
    },

    getLocation() {
        return {longitude, latitude};
    }
};

export default geolocationApi;