export function addFavouriteLocation(favouriteLocations, location) {
    return [...favouriteLocations, location];
}

export function removeFavouriteLocation(favouriteLocations, location) {
    return favouriteLocations.filter(element => element !== location);
}
