import User from "../models/user.model.js";

export const addFavouriteService = async(userId, favouriteLocation) => {
    const user = await User.findById(userId);   
    user.favourites.push(favouriteLocation); 
    user.save();
    console.log(user.favourites);
}