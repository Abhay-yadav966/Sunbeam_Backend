const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.header("Authorization").replace("Bearer ", "");
        // Token missing
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is missing",
            });
        }

        // verify/decode the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (err) {
            return res.status(498).json({
                success:false,
                message:"Token is invalid",
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong in validating the token",
        });
    }
}