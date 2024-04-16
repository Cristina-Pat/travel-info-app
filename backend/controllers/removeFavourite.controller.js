import { removeFavouriteService } from "../services/removeFavourite.service.js";

export const removeFavourite = async (req, res) => {
    try {
        console.log('removeFavourite');
        await removeFavouriteService(req.userId, req.body.location);
        res.json({message: `${req.body.location} removed from favourites`});
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};