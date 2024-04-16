import express from "express";
import verifyToken  from "../middleware/verifyToken.js";
import { getFavourites } from "../controllers/getFavourites.controller.js";
import { addFavourite } from "../controllers/addFavourite.controller.js";
import { removeFavourite } from "../controllers/removeFavourite.controller.js";

export const router = express.Router();

// to get here, the router is responding to a request to http://localhost:4127/favourites

// router.route(`/example`).get((req, res) => {
//     // deals with a request to http://127.0.0.1:4127/favourites/
//     res.end(`Getting favourites`);
// });

router.use(express.json());

router.route(`/`).post(verifyToken, getFavourites);
router.route(`/add`).post(verifyToken, addFavourite);
router.route(`/remove`).post(verifyToken, removeFavourite);
