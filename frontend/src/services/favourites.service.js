import axios from "axios";
import authService from "./auth.service";

const API_URL = `http://localhost:4127`;

const addFavourite = async (location) => {
    try {
        const user = authService.getUser();
        if(!user) return;

        const response = await axios.post(`${API_URL}/favourites/add`, {
            accessToken: user.accessToken,
            location: location
        });
        const data = await response.data;

        return data;
    }
    catch (error) {
        return { error: error.response.data.message };
    }
};

const removeFavourite = async (location) => {
    try {
        const user = authService.getUser();
        if(!user) return;

        const response = await axios.post(`${API_URL}/favourites/remove`, {
            accessToken: user.accessToken,
            location: location
        });
        const data = await response.data;

        return data;
    }
    catch (error) {
        return { error: error.response.data.message };
    }
};

const getFavourites = async () => {
    try {
        const user = authService.getUser();
        if(!user) return;

        const response = await axios.post(`${API_URL}/favourites`, {
            accessToken: user.accessToken
        });
        const data = await response.data;

        return data;
    }
    catch (error) {
        return { error: error.response.data.message };
    }
}

const favouritesService = {
    addFavourite,
    removeFavourite,
    getFavourites
};

export default favouritesService;