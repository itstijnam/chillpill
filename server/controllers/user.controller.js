import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookie from 'cookie-parser';



export const signup = async (req, res) => {
    try {
        const {
            username,
            phnumber,
            gender,
            password,
            person_name,
            country_code,
            country
        } = req.body;

        if (!username || !phnumber || !gender || !password || !country_code || !country) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required details"
            });
        }

        const redefineUsername = username.trim().toLowerCase().replaceAll(' ', '_');

        if (!/^[0-9]{10}$/.test(phnumber)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid 10-digit phone number"
            });
        }

        const existUser = await User.findOne({ username: redefineUsername });
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "Try another username"
            });
        }

        const existPhoneNumber = await User.findOne({ phnumber });
        if (existPhoneNumber) {
            return res.status(400).json({
                success: false,
                message: "This phone number is already in use"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createdUser = await User.create({
            person_name,
            username: redefineUsername,
            phnumber,
            gender,
            password: hashedPassword,
            country_code,
            country
        });

        return res.status(200).json({
            success: true,
            message: "Registration successful",
            user: {
                _id: createdUser._id,
                person_name: createdUser.person_name,
                username: createdUser.username,
                country_code: createdUser.country_code,
                country: createdUser.country,
                isServiceProvider: createdUser.isServiceProvider
            }
        });

    } catch (error) {
        console.error(`controller/usercontroller/signup: Error ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both username and password"
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        // ✅ Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Lax", // or "None" if using cross-site and HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username,
                person_name: user.person_name,
                country: user.country,
                isServiceProvider: user.isServiceProvider
            }
        });

    } catch (error) {
        console.error(`controller/usercontroller/login: Error ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error(`controller/usercontroller/logout: Error ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
