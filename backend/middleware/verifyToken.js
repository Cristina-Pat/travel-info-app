import jwt from 'jsonwebtoken';


// This function verifies the JWT from the request body
function verifyToken(req, res, next) {

    // Get the accessToken from the body of the request
    let { accessToken } = req.body;

    if (accessToken) {
        // Verify the token using the secret key
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            // If the token is not valid, access is forbidden (403 status code)
            if (err) {
                return res.sendStatus(403);
            }

            // If the token is valid, add the user's ID to the request object
            req.userId = decoded.userId;
            next();
        });
    } else {
        // If no Authorization header, respond with 401 status code as client didn't provide authentication credentials
        console.log('No access token on request');
        res.sendStatus(401);
    }
}

export default verifyToken;