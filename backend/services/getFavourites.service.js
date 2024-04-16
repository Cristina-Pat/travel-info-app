import User from "../models/user.model.js";

export const getFavouritesService = async(userId) =>{
    const user = await User.findById(userId);   
    console.log(user.favourites);
    return user.favourites;
}