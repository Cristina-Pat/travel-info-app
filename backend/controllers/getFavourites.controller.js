import { getFavouritesService } from "../services/getFavourites.service.js";

export const getFavourites = async (req, res) => {
    try {
        console.log('getFavourites');
        const favourites =  await getFavouritesService(req.userId);
        res.json(favourites);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
};