const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUserExists = (email) => {
    return new Promise((resolve, reject) => {
        const sql = "select * from user where email=?";
        pool.query(sql, [email], (error, data) => {
            if (data.length == 0) {
                return resolve(false);
            } else {
                return resolve(data);
            }
        })
    })
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Please fill all details carefully",
            });
        }
        const userDetails = await checkUserExists(email);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "SignUp first User not Found",
            });
        }

        const user = userDetails[0];

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user.id,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;

            // create cookie and send responce
            const options = {
                expires: new Date( Date.now() + 3*24*60*60*1000 ),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                user,
                token,
                message:"Logged in Successfully",
            })


        } else {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password, "
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message,
            message: "Login failed, Please try again",
        });
    }
}

const validateUser = (email) => {
    return new Promise((resolve, reject) => {
        const sql = "select * from user where email=?";
        pool.query(sql, [email], (error, data) => {
            if (data.length > 0) {
                return resolve(data);
            } else {
                return reject(error);
            }
        })
    })
}

exports.signUp = async (req, res) => {
    try {
        const { full_name, email, password, phone_no } = req.body;

        if (!full_name || !email || !password || !phone_no) {
            return res.status(403).json({
                success: false,
                message: "All fields are required ",
            });
        }

        const found = await validateUser(email);
        if (found) {
            return res.status(403).json({
                success: false,
                message: "User Already Registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql2 = "INSERT INTO user (full_name, email, password, phone_no) VALUES (?, ?, ?, ?)";
        pool.query(sql2, [full_name, email, hashedPassword, phone_no], (error, data) => {
            if (data) {
                res.status(200).json({
                    success: true,
                    message: "User Register Successfully",
                });
            }
            else if (error) {
                throw new Error(error);
            }
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message,
            message: "User does not registered, please try again",
        });
    }
} 