import FavouritesPage from "./components/FavouritesPage";
import FooterRibbon from "./components/FooterRibbon";
import MainPage from "./components/MainPage";
import NavRibbon from "./components/NavRibbon";
import WeatherPage from "./components/WeatherPage";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFavouriteLocation, removeFavouriteLocation } from "./components/utils/appMainUtils";
import RegistrationPage from "./components/RegistrationPage";
import Login from "./components/LoginPage";
import ChangePassword from "./components/ChangePassword";
import favouritesService from "./services/favourites.service"

// This component is needed to allow unit testing with a MemoryRouter (App already uses a BrowserRouter)
const AppMain = ({initialFavourites, aFavouritesService}) => {
    const [favouriteLocations, setFavouriteLocations] = useState(initialFavourites, []);
    if(!aFavouritesService) {
        aFavouritesService = favouritesService;
    }

    const handleAddFavourite = async (location) => {
        setFavouriteLocations(addFavouriteLocation(favouriteLocations, location));
        await aFavouritesService.addFavourite(location);
    }
    
    const handleRemoveFavourite = async (location) => {
        setFavouriteLocations(removeFavouriteLocation(favouriteLocations, location));
        await aFavouritesService.removeFavourite(location);
    }

    useEffect(() => {
        async function loadFavourites() {
            const savedFavourites = await aFavouritesService.getFavourites();
            console.log("loaded favourites ", savedFavourites);
            setFavouriteLocations(savedFavourites);
        }
        loadFavourites();
     }, []);
  
    return (
        <>
            <NavRibbon favouriteLocations={favouriteLocations} ></NavRibbon>
            
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<RegistrationPage/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/changepassword" element={<ChangePassword/>}></Route>
                <Route path="/weather" element={<WeatherPage  
                    favouriteLocations={favouriteLocations} 
                    onAddFavourite={handleAddFavourite}
                    onRemoveFavourite={handleRemoveFavourite} />} />
                <Route path="/favourites" element={<FavouritesPage 
                    favouriteLocations={favouriteLocations}
                    onRemoveFavourite={handleRemoveFavourite} />} />
                
            </Routes>
            <FooterRibbon></FooterRibbon>
            
        </>
    );
};

AppMain.defaultProps = {
    initialFavourites: []
}

export default AppMain;
