// Convert temperature from Kelvin to Celsius
export const kelvinToCelsius = (temp) => {
    return temp - 273.15;
}

// Format UTC date to the '1 January 2024' format
// Based on https://stackoverflow.com/questions/5416920/timestamp-to-human-readable-format
export const getFormalDate = (utcDate) => {
    if(!utcDate) return '';

    const formattedUtc = utcDate.split(' ').join('T')+'Z'
    let date = new Date(formattedUtc);
    if (date.toString() === "Invalid Date")
        return "N/A";

    return date.toLocaleDateString("en-GB", {month: 'long', day: 'numeric', year: 'numeric'});
}

// Format UTC date to the 'Mon'format
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#weekday
export const getFormalDay = (utcDate) => {
    if(!utcDate) return '';

    const formattedUtc = utcDate.split(' ').join('T')+'Z'
    let date = new Date(formattedUtc);
    if (date.toString() === "Invalid Date")
        return "N/A";

    return date.toLocaleDateString("en-GB", {weekday: 'short'});
}

// Format temperature to a whole number
export const formatTemperature = (temp) => {
    return Math.round(temp);
}

// Extract relevant weather data from data point
export const extractFromDataPoint = (dPoint) => {
    const ktemp = dPoint.main.temp;
    const date = dPoint.dt_txt;
    const icon = dPoint.weather[0].icon;
    const description = dPoint.weather[0].description;
    const temperature = kelvinToCelsius(ktemp);
    console.log("date is ", date);
    return {
        date,
        icon,
        description,
        temperature
    }
}

// Extract today's weather data from API response
export const extractTodayWeather = (wData) => {
    const dataPoint = wData.list[0];
    const convertedDP = extractFromDataPoint(dataPoint);
    //setTodayWeather(convertedDP);
    return convertedDP;
}

// Extract next days' weather data from API response
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
export const extractNextDaysWeather = (wData) => {
    // first implementation
    // const dataPoints = wData.list.filter((elem, index) => {
    //     return (index > 0 && elem.dt_txt.includes("12:00:00"));
    // });

    // filter the data points that include "12:00:00" and limit the data points to the next 4 days
    const dataPoints = wData.list.filter((elem) => elem.dt_txt.includes("12:00:00"));
    const fourDaysDataPoints = dataPoints.slice(1, 5);

    const convertedDPs = fourDaysDataPoints.map((elem) => {
        return extractFromDataPoint(elem);
    });

    //setNextDaysWeather(convertedDPs);
    return convertedDPs;
}