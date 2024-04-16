import jwt from "jsonwebtoken";

const getIdFromToken = (token) => {
    if (!token) throw new Error('No token')

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if(error) {
                reject(new Error("Invalid token"));
            } else {
                resolve(decoded.userId);
            }
        });
    });
}

export default getIdFromToken;