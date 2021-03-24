const favouritesAPI = {
    getAll() {
        return fetch(`/favourites`);
    },

    addCity(city) {
        return fetch(`/favourites?city=${city}`, {
            method: "post"
        });
    },

    removeCity(city) {
        return fetch(`/favourites?city=${city}`, {
            method: "delete"
        });
    }
};

export default favouritesAPI;