import User from "../models/user.model.js";

export const removeFavouriteService = async(userId, favouriteLocation) =>{
    const user = await User.findById(userId);   
    user.favourites.pull(favouriteLocation); 
    user.save();
    console.log(user.favourites);
}