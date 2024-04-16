import { config } from "dotenv";
import { connectDB } from "./db/connection.js";
import express from "express";
import cors from 'cors';
import User from "./models/user.model.js";
import bcrypt from 'bcryptjs';
import hashPassword from "./middleware/hashPassword.js";

import {router as favouriteRouter} from "./routes/favourite.route.js"
import generateToken from "./middleware/generateJWT.js";
import getIdFromToken from "./middleware/getIdFromToken.js"
import verifyToken  from "./middleware/verifyToken.js";

config({path: `.env.${process.env.NODE_ENV}`});

const app = express(); //a web application framework helping to build backend services
 
app.use(cors());
app.use('/favourites', favouriteRouter);

try {
    console.log(`Connecting to DB@ ${process.env.DB_URI}`);
    await connectDB(process.env.DB_URI);
    console.log(`Connected to DB@ ${process.env.DB_URI}`);
} catch (err) {
    console.log(err);
}

app.use(express.json()); // parsing application/json

const server = app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));

// if a request comes on /register endpoint this is the handler that responds to it
app.post('/register', hashPassword, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // check for existing user
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // create a new user
        user = new User({
            username,
            email,
            password
        });

        // save the user to the database
        const savedUser = await user.save();

        // send the saved user in the response
        res.json(savedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// app.post('/login', async(req, res) => {
//     console.log("body: ", req.body);
//     let { email, password }= req.body;

//     console.log("email: ", email);

//     try{
//         const user = await User.findOne({ email: email }).exec();
//         console.log("user: ", user);
//         console.log(password);
//         if (!user) return res.status(404).json( {message: `User details do not exist`});
        

//         const passwordIsValid = await bcrypt.compareSync(password, user.password);

//         const token = await generateToken(user._id);

//         if (user && passwordIsValid) {
//                 return res.status(200).json({ 
//                     "message": 'Login successful',
//                     "accessToken": token,
//                     "id": user._id.toString(),
//                     "email": user.email
//                 });
//             }

//         return res.status(403).json({ msg: 'Access forbidden' })

//     } catch (err){
//         console.error(err.message);
//         res.status(500).json({ error: err.message });
//     }
// });

// refactored using GAI

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(404).json({ message: 'User details do not exist' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(403).json({ message: 'Invalid password' });
        }

        const token = await generateToken(user._id);

        return res.status(200).json({
            message: 'Login successful',
            accessToken: token,
            id: user._id.toString(),
            email: user.email
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// app.post('/changepassword', verifyToken, hashPassword, async (req, res) => {
//     console.log("body: ", req.body);

//     try {
//         await User.updateOne(
//             {_id: req.userId}, 
//             {$set: {
//                 password: req.body.password
//             }}).exec();
//         res.json({message: "Password changed"});
//     } catch(err) {
//         console.error(err.message);
//         res.status(500).json({ error: err.message });
//     }
    

// });

// refactored using GAI
app.post('/changepassword', verifyToken, hashPassword, async (req, res) => {
    try {
        await User.updateOne(
            { _id: req.userId }, 
            { $set: { password:  req.body.password } }
        ).exec();

        return res.status(200).json({ message: "Password changed" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default server;