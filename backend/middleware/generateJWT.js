import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` })


function generateToken(userId) {
    try {
        // The payload of the token is the user ID
        const userTokenLoad = {
            userId: userId,
        };
        // Sign the token with the secret key and set it to expire in 10 days
        const token = jwt.sign(userTokenLoad, process.env.JWT_SECRET, { expiresIn: '10d' });

        console.log('Token successfully created');
        return token;
    } catch (error) {
        console.error('Error creating token:', error);
    }
}

export default generateToken;