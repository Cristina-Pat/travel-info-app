import TellingYou from "./TellingYou";


function FavouritesPage(props) {

    const handleRemove = (event) => {
        props.onRemoveFavourite(event.target.id);
    }

    const favouriteList = props.favouriteLocations.map(data => 
        <div className="location" key={data}>
            <img onClick={handleRemove} id={data} data-testid={data} className="fav-icon me-1" src="/assets/fav_2.png" alt="" /> 
            {data}
        </div>
    );

    return (
        <main>
            <div className="page-content container">
                <TellingYou about="Favourite Locations" />
                
                <div className="text-center">
                    Click <img className="fav-icon" src="/assets/fav_2.png" alt="" /> to remove from favourites
                </div>
                <div className="text-center mb-5">
                    Click name to view info
                </div>
                
                <div className="favourites-list">
                    {favouriteList}
                </div>
            </div>
        </main>
    );
}

FavouritesPage.defaultProps = {
    favouriteLocations: [],
    onRemoveFavourite: () => {}
}

export default FavouritesPage;
