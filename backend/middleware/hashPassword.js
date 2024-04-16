import bcrypt from "bcryptjs";


const hashPassword = async function (req, res, next) {

    try {
            const salt = await bcrypt.genSalt(10);
            // Hash the password using the above generated salt
            req.body.password = await bcrypt.hash(req.body.password, salt);
        next();
    } catch (error) {
        throw new Error(error)
    }
};

export default hashPassword;
