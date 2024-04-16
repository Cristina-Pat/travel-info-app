import { addFavouriteService } from "../services/addFavourite.service.js";

export const addFavourite = async (req, res) => {
    try {
        console.log('addFavourite');
        await addFavouriteService(req.userId, req.body.location);
        res.json({message: `${req.body.location} added to favourites`});
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};