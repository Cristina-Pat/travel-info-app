# Travel Info Challenge

```ascii

-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----
           . _..::__:  ,-"-"._        |7       ,     _,.__
   _.____ _<_>`!(._`.`-.    /         _._`_ ,_/  '  '-._.---.-.__
>.{     " " `-==,',._\{  \  / {)      / _ ">_,-'`                mt-2_
  \_.:--.       `._ )`^-. "'       , [_/(                       __,/-'
 '"'     \         "    _L        oD_,--'                )     /. (|
          |           ,'          _)_.\\._<> 6              _,' /  '
          `.         /           [_/_'` `"(                <'}  )
           \\    .-. )           /`-'"..' `:.#          _)  '
    `        \  (  `(           /`:\  > \  ,-^.  /' '
              `._,   ""         |           \`'   \|   ?_)  {\
                 `=.---.`._._       ,'     "`|' ,- '..
                   |    `-._         |     /          `:`<_|h--._
                   (        >        .     | ,          `=.__.`-'\
                    `.     /         |     |{|              ,-.,\     .
                     |   ,'           \   /`'            ,"     \
                     |  /              |_'                |  __  /
                     | |                                  '-'  `-'   \.
                     |/                                         "    /
                     \.                                             '

                      ,/            ______._.--._ _..---.---------._
     ,-----"-..?----_/ )      __,-'"             "                  (
-.._(                  `-----'`-
-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----
Map (C) 1998 Matthew Thomas. 
```

## Frontend Introduction

DFCorp are interested in expanding their portfolio of applications that you have been developing.  Their latest idea is a web-based travel information application.  The initial requirement is to display a 5 day weather forecast for any searchable location with the functionality to be able to save favourite locations locally.  In addition to this they have further requirements to fulfil, if you have time, with these being a map of the local area and a slide show of local hotels.  They hope that this will encourage the users of their current apps to use this service and see potential for integration into other apps that they have in design.

> Before proceeding, ensure that you have a solid understanding of why a user needs this software and the benefits that it will bring to them (See Task 1).

## Core Features

The Business Analyst team working with DFCorp has identified the following features that should be implemented:

- The user should see a location search box when they access the application home page that allows them to search any town or city by name (as per the wireframe supplied)
- The application should send a query to a weather API to get a 5-day forecast if the location can be found
- When the forecast data is returned, a new view should be displayed, using the wireframe(s) for the view layout
- The user should be able to save a location as a favourite (although this should only persist on the device they are using at the time)
- The application should be responsive across the main breakpoints for devices (mobile, tablet, desktop) - wireframes are provided for each of these

The layouts are pretty much agreed with the main stakeholder but they are open for you to put your creative flair into the colour scheme and any images used (that are not specific to the location content).  They are also open to suggestions for the name of the application and its logo.

> **Note:** The use of a generative AI tool to complete tasks relating to the specific requirements above is NOT allowed.  All work here should be your own.

## Additional Features

In addition to these features, should time allow, the client has asked for the application to display the following on the same view as the weather (as per the wireframes):

- A map of the selected location
- A list of hotels in the selected location, displayed on a carousel that can be moved on; Hotel images should be in a slide show within the hotel's carousel.

Please see the wireframes for more information about the specific data and layout to be used to base your application on

> **Note:** The use of a generative AI tool to help complete tasks relating to these further requirements is allowed but should be clearly documented.

---

## Tasks

1. From the requirements listed above, devise a set of user stories that describe the functionality that the client has requested
2. From the wireframes and the user stories, devise a component hierarchy that will help in the construction of the web application and explain your reasoning for this hierarchy
   - When you have made your static application, add your "state" planning indicating why you have chosen to hold state in that specific component
   - Answering the 3 state questions here would help!
3. Create the application using the "Thinking in React" strategy and creating tests for any logic that will affect the user's experience
4. Once you have completed your application, write a document that makes suggestions for further development of the application, including any potential integration with other DFCorp applications and external APIs:
   - This should include a description of the potential benefits of these integrations or additional APIs, how they could be implemented and the potential risks of these integrations

Ensure that the application that you submit will run in the development environment (using `npm run dev` command).

---

## Tips

- Commit regularly to GitHub with clear commit messages - write a failing test, pass the test, commit, etc
- You should put your component hierarchies, state identification notation and test plans in the markdown file in the `docs` folder, if you decide to use some form of Scrum board to track your progress, you should include a screenshot of this in the markdown file
- Structure your `src` folder with suitable sub-folders to help identify groups of components

---

## APIs

The following APIs can be used in this project.  Be mindful of any request limits and DO NOT use any APIs that require billing information.

---

### Weather API

For weather information, you can use the free ***OpenWeatherMap*** API by signing up for a free developer key - select the ***FREE*** tier here:

[https://openweathermap.org/price](https://openweathermap.org/price)

Once you have your API key, you can use the following fetch or Axios request to obtain the weather data for a location:

```javascript
const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=<YOUR API KEY>`);
setWeatherData(response.data);
```

The data returned will be in JSON format and will contain a list of weather data for the next 5 days.  You will need to parse this data and display it in a suitable format on the page.

An example of the returned weather data can be found in the `data` folder of this repository.

#### Further Helper Code

<details>
The following code will help you extract the weather data returned from the API:

```javascript
const updateState = (data) => {
    const tempDays = [];
    const dayIndices = getDayIndices(data);

    for (let i = 0; i < 5; i++) {
        const currentData = data.list[dayIndices[i]];
        tempDays.push({
            date: currentData.dt_txt,
            weather_desc: currentData.weather[0].description,
            icon: currentData.weather[0].icon,
            temp: currentData.main.temp,
        });
    }
    return tempDays;
};
// returns array with Indices of the next five days in the list from the API data (every day at 12:00 pm)
const getDayIndices = (data) => {
    let dayIndices = [0];
    let currentDay = data.list[0].dt_txt.slice(8, 10);

    for (let i = 1; i < data.list.length; i++) {
        let day = data.list[i].dt_txt.slice(8, 10);
        let hour = data.list[i].dt_txt.slice(11, 13);

        if (day !== currentDay && hour === "15") {
            dayIndices.push(i);
            currentDay = day;

            // Stop after finding 4 different days
            if (dayIndices.length === 5) {
                break;
            }
        }
    }
    return dayIndices;
};
const days = updateState(data);

const weatherBoxes = days.slice(1).map((day) => (
    <WeatherBox {...day} key={new Date(day.date).getDay()} />
));
```

> `WeatherBox` is a component that displays weather data for a single day (as per the small weather box in the wireframe).
> `weatherBoxes` maps the array of days found by calling `updateState` (and subsequently `getDayIndicies`) and to an array of the `WeatherBox` components for each day.

#### Using the Weather Icons

Inspecting the return from the weather API, you will see that a number of icons can be referenced as shown in this excerpt from the dummy data file in the `data` folder of this repository:

```json
{ 
"weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
}
```

The `icon` property can be used to reference the appropriate icon for the weather condition.  You can use the following `src` property in an `img` to display the icon in your application:

```JSX
<img src={`/assets/weather-icons/${weather[0].icon}.svg`}>
```

The `/assets/weather-icons` folder is in the `public` folder of your application and contains the icons that you need to display the weather conditions supplied by the API call.  This is the correct way to use dynamic images inside a React application scaffolded with Vite.

</details>

---

### Maps API

For maps use the free ***TomTom*** API by signing up for a free developer key:

[https://developer.tomtom.com/](https://developer.tomtom.com/)

Once you have done this, you will use the ***Maps SDK*** web functionality to render a map based on the *Longitude* and *Latitude* of the location you want to display. These are available from the data that comes from the initial weather search for the location.

This [page](https://developer.tomtom.com/blog/build-different/adding-tomtom-maps-modern-react-app/) gives you a tutorial on how to add a TomTom map to your website, although it isn't very clear.  This component code puts a map on the page and is a good starting point:

```javascript
import { useRef } from 'react';

import tt from '@tomtom-international/web-sdk-maps'; // npm i @tomtom-international/web-sdk-maps
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const Map = ({[long, lat]: center}) => {
const mapElement = useRef();

    const mapLongitude = -121.91599;
    const mapLatitude = 37.36765;
    const mapZoom = 10;
    const [map, setMap] = useState({});

    useEffect(() => {
        let map = tt.map({
            key: "<YOUR API KEY HERE>",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom,
        });
        setMap(map);
        return () => map.remove();
    }, []);

    return (
        <>
            <div
                ref={mapElement}
                className="mapDiv"
                style={{ height: "500px" }} /* This height value can be set to whatever you need} */
            />
        </>
    );
}
```

> It is recommended that you create a project and get this working standalone before integrating it into your main project.

---

### Hotel API

For hotel information, you can use the free ***RapidAPI*** to access the ***[Priceline.com](https://rapidapi.com/davidtaoweiji/api/priceline-com/)*** API by signing up for a free developer key.

Once you have done this, you can use the following fetch or Axios request to obtain the hotel data for a location:

```javascript

const options = {
  method: 'GET',
  url: 'https://priceline-com.p.rapidapi.com/hotels/city/search',
  params: {q: 'Dublin US'},
  headers: {
    'X-RapidAPI-Key': '<YOUR KEY HERE>',
    'X-RapidAPI-Host': 'priceline-com.p.rapidapi.com'
  }
};

try {
 const response = await axios.request(options);
 console.log(response.data);
} catch (error) {
 console.error(error);
}
```

You can then break the response object down to get the hotel data that you need to display in the carousel.

An example of hotel data can be seen in the file `dummyHotelData.json` in the `data` folder of this repository.

---

## Wireframes

The wireframes for the application can be found in the following Miro board:

[Travel Info Challenge Wireframes](https://miro.com/app/board/uXjVNryPC9E=/?share_link_id=354675864218)

On this board, you will find wireframes for a mobile device, a tablet in portrait mode and a wireframe for tablets in landscape mode and larger.  You should use these wireframes to help you create component hierarchies for the application.

The notes at the side of the wireframes are there to help you understand the requirements of the application and the data that should be displayed.


## Backend Introduction

After running the Travel Info Web Application without any backend services other than the direct API calls for a few weeks, DFCorp have received feedback from their users that the application could be improved to make it more personalised to them.  In response to this, DFCorp have decided to commission you to build a set of backend services that will allow the Travel Info Web Application to have individual users and for them to be able to use their favourite locations for use across any device they log in on.

> Before proceeding, ensure that you have a solid understanding of why a user needs this software and the benefits that it will bring to them (See Task 1).

## Core Features

The Business Analyst team working with the Product Owner at DFCorp have identified the following core features that the backend services should provide:

1. **User Authentication**:
   - The web application will send registration details to a backend service to create a new user account
   - The web application will send login details to the backend service to authenticate a user
   - The web application will send a password change request to the backend service and update the user's password
   - A user must be authenticated on every subsequent request to any other backend service
2. **Favourite Locations**:
   - The web application will send a request to a backend service to obtain the stored favourite locations of an authenticated user
   - The web application will send a request to add a new location to an authenticated user's favourite locations
   - The web application will send a request to remove a location from an authenticated user's favourite locations

You may architect the backend services in any way you see fit.  Authentication can be handled through a simple check of username/password on each request but more efficient and secure methods are encouraged.  The storage of user data and favourite locations can be done in any way you see fit but must be held in a MongoDB database.

> **Note:** The use of a generative AI tool to complete tasks relating to the specific requirements above is NOT allowed.  All work here should be your own.

## Additional Features

DFCorp have been made aware that inserting API keys into frontend applications can leave their accounts open to abuse.  To counter this, they have asked that you create proxy services that will allow the frontend application to make requests to the backend services without exposing the API keys.

They are also concerned that an industry standard method of authentication is not being used and have asked that you implement JSON Web Token (JWT) authentication for the backend services.

The Product Owner at DFCorp has also identified a number of additional features that they would like to see in the backend services if time should allow you:

1. **JSON Web Token Authentication**:
   - Once a user has logged in, a JSON Web Token (JWT) should be returned to the web application and used for all subsequent requests
2. **Proxy Services**:
   - Weather API Proxy Service:
      - The web application will send a request to the backend service to obtain weather information for a location using the weather API and its key used in the frontend application and it will be responsible for returning the data to the web application (in JSON format)
   - **Map API Proxy Service**:
     - The TomTom API used allows you to set a whitelist of domains that can access the API - this means a proxy is not needed as the domain for the web application can be used and key exposure is not a concern
   - **Hotel API Proxy Service**:
     - The web application will send a request to the backend service to obtain hotel information for a location using the hotel API and its key used in the frontend application and it will be responsible for returning the data to the web application (in JSON format)

> **Note:** The use of a generative AI tool to help complete tasks relating to these further requirements is allowed but should be clearly documented.

---

## Tasks

1. Explain why the customer needs the backend services and the benefits that it will bring to them.  You should include the following in your explanation:
   - The problems that the backend services will solve
   - The benefits that the backend services will bring to the user
   - The impact that the backend services will have on the customer's business
2. From the requirements listed above, devise a set of user stories that describe the functionality that the client has requested
3. Create a set of routing diagrams that show how the backend services will be accessed by the frontend application
4. Create the application using a test-driven development (TDD) approach and the NodeJS/Express/MongoDB stack
5. Create a set of tests that validate the functionality of the backend services using POSTMAN

### Bonus Task (Strictly optional but would be great!)

Can you deploy the frontend and backend to cloud services such as Netlify and Render and implement a cloud-based database?

If you can, provide links to your deployed applications and databases in the markdown file in the `docs` folder.  This should include a **username** and **password** that can be used to test the deployment.

---


---

