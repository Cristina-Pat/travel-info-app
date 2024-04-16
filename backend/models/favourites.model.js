import mongoose from "mongoose";

const favouritesSchema = new mongoose.Schema({
    city:{type: String, required: true},
});

const Favourites = mongoose.model(`Favourite`, favouritesSchema);

export default Favourites;