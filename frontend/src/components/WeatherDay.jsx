import PropTypes from "prop-types";

function WeatherDay({day, temperature, description, icon}) {
    return (
        <div className="weather-day">
            <div className="day-name">{day}</div>
            <div className="weatherIcon">
                <img src={"/assets/weather-icons/" + icon + ".svg"} alt="" />
            </div>
            <div className="temperature">{temperature + " °C"}</div>
            <div className="weather-description">{description}</div>
        </div>
    );
}

WeatherDay.defaultProps = {
    icon: "04d"
}

WeatherDay.propTypes = {
    day : PropTypes.string.isRequired,
    temperature : PropTypes.number.isRequired,
    description : PropTypes.string.isRequired,
    icon : PropTypes.string
}

export default WeatherDay;
