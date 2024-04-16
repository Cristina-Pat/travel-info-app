The Business Analyst team working with the Product Owner at DFCorp have identified the following core features that the backend services should provide:

User Authentication:
The web application will send registration details to a backend service to create a new user account
The web application will send login details to the backend service to authenticate a user
The web application will send a password change request to the backend service and update the user's password
A user must be authenticated on every subsequent request to any other backend service

Favourite Locations:
The web application will send a request to a backend service to obtain the stored favourite locations of an authenticated user
The web application will send a request to add a new location to an authenticated user's favourite locations
The web application will send a request to remove a location from an authenticated user's favourite locations
You may architect the backend services in any way you see fit. Authentication can be handled through a simple check of username/password on each request but more efficient and secure methods are encouraged. The storage of user data and favourite locations can be done in any way you see fit but must be held in a MongoDB database.

Note: The use of a generative AI tool to complete tasks relating to the specific requirements above is NOT allowed. All work here should be your own.

Additional Features
DFCorp have been made aware that inserting API keys into frontend applications can leave their accounts open to abuse. To counter this, they have asked that you create proxy services that will allow the frontend application to make requests to the backend services without exposing the API keys.

They are also concerned that an industry standard method of authentication is not being used and have asked that you implement JSON Web Token (JWT) authentication for the backend services.

The Product Owner at DFCorp has also identified a number of additional features that they would like to see in the backend services if time should allow you:

JSON Web Token Authentication:
Once a user has logged in, a JSON Web Token (JWT) should be returned to the web application and used for all subsequent requests
Proxy Services:
Weather API Proxy Service:
The web application will send a request to the backend service to obtain weather information for a location using the weather API and its key used in the frontend application and it will be responsible for returning the data to the web application (in JSON format)
Map API Proxy Service:
The TomTom API used allows you to set a whitelist of domains that can access the API - this means a proxy is not needed as the domain for the web application can be used and key exposure is not a concern
Hotel API Proxy Service:
The web application will send a request to the backend service to obtain hotel information for a location using the hotel API and its key used in the frontend application and it will be responsible for returning the data to the web application (in JSON format)
Note: The use of a generative AI tool to help complete tasks relating to these further requirements is allowed but should be clearly documented.