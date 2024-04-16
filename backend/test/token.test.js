import generateToken from "../middleware/generateJWT.js";
import getIdFromToken from "../middleware/getIdFromToken.js";
import {assert} from 'chai';

describe('Testing JWT creation and verification', () => { 
    it("Should generate a token from a user id", async() => {

        const user = {
            _id: "65fc434c78966d8c0fc04010"
        };

        const token = generateToken(user._id);
        assert.isString(token, "Token should be a string");

        const extractedId = await getIdFromToken(token);
        
        assert.strictEqual(extractedId, user._id, "Extracted user id should match the original");
    })
})