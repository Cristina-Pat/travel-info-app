import TellingYou from "./TellingYou";
import WeatherDay from "./WeatherDay";
import WeatherDayMain from "./WeatherDayMain";
import { useSearchParams } from "react-router-dom";
import weatherData from "../../data/dummyWeatherData.json"
import { useState, useEffect } from "react";
import {getFormalDate, getFormalDay, formatTemperature, extractNextDaysWeather, extractTodayWeather} from "./utils/weatherUtils.js";
import axios from "axios";
import authService from "../services/auth.service.js"


function WeatherPage(props) {
//https://reactrouter.com/en/main/hooks/use-search-params#usesearchparams
  let [searchParams, setSearchParams] = useSearchParams();
  let [todayWeather, setTodayWeather] = useState({});
  let [nextDaysWeather, setNextDaysWeather] = useState([]);
  
  const useMockData = true;
  const user  = authService.getUser();

    const handleCheckboxChange = (event) => {
        if(event.target.checked) {
            props.onAddFavourite(searchParams.get("location"));
        } else {
            props.onRemoveFavourite(searchParams.get("location"));
        }
    }

   

    useEffect(() => {
        const getData = async () => {
            if(useMockData) {
                setTodayWeather(extractTodayWeather(weatherData.dublin));
                setNextDaysWeather(extractNextDaysWeather(weatherData.dublin));

            } else {
                let response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=` + searchParams.get("location") + `,uk&APPID=05d2bdfff395b5da5e2fb79ddc44b863`);

                console.log('axios response ', response);

                setTodayWeather(extractTodayWeather(response.data));
                setNextDaysWeather(extractNextDaysWeather(response.data));
            }    
        };
        getData();
        
    }, []);

    let addToFavouritesCheckbox;
    if(user) {
        addToFavouritesCheckbox = 
            <div className="is-favorite text-center">
                <input 
                    type="checkbox" 
                    name="favorite" 
                    id="add-favourite-checkbox" 
                    onChange={handleCheckboxChange}
                    checked={props.favouriteLocations.includes(searchParams.get("location"))}
                    />
                <label htmlFor="add-favourite-checkbox">Click to add to favourites</label>
            </div>;
    } else {
        addToFavouritesCheckbox = <></>
    }

    const nextDaysElements = nextDaysWeather.map((element) => 
        <WeatherDay
            key={element.date}
            day={getFormalDay(element.date)}
            temperature={formatTemperature(element.temperature)}
            description={element.description}
            icon={element.icon} />
    )

    return (
        <main>
            <div className="page-content container">
                <TellingYou about={searchParams.get("location")} />
                
                {addToFavouritesCheckbox}

                <div className="todays-weather text-center">
                    Today's Weather:
                </div>

                <WeatherDayMain
                    date={getFormalDate(todayWeather.date)}
                    temperature={formatTemperature(todayWeather.temperature)}
                    description={todayWeather.description}
                    icon={todayWeather.icon} />
                

                <div className="weather-next text-center d-flex justify-content-center flex-wrap">
                    {nextDaysElements}
                </div>
            </div>
        </main>
    );
}

WeatherPage.defaultProps = {
    favouriteLocations: [],
    onAddFavourite: () => {},    
    onRemoveFavourite: () => {}
}

export default WeatherPage;
