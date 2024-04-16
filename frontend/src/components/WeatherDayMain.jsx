import PropTypes from "prop-types";

function WeatherDayMain({date, temperature, description, icon}) {
    return (
        <>
            <div className="date text-center">{date}</div>
            <div className="weather-main text-center d-flex justify-content-center align-items-center">
                <div className="weatherIcon">
                    <img className="weather-main-img" src={"/assets/weather-icons/" + icon + ".svg"} alt="" />
                </div>
                <div className="temperature">{temperature} °C</div>
                <div className="weather-description">{description}</div>
            </div>
        </>
    );
}

WeatherDayMain.defaultProps = {
    icon: "04d"
}

WeatherDayMain.propTypes = {
    date : PropTypes.string.isRequired,
    temperature : PropTypes.number.isRequired,
    description : PropTypes.string.isRequired,
    icon : PropTypes.string
}

export default WeatherDayMain;
