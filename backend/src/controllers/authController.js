"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.authCheck = authCheck;
const userModel_1 = require("../models/userModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../utils/generateToken");
async function signup(req, res) {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!(emailRegex.test(email))) {
            return res.status(400).json({ success: false, message: "Invalid Email" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }
        const existingUserByEmail = await userModel_1.UserModel.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "User is already existing with this email" });
        }
        const existingUserByUsername = await userModel_1.UserModel.findOne({ username: username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "User is already existing with this username" });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
        const newUser = new userModel_1.UserModel({
            username: username,
            password: hashedPassword,
            email: email,
            image: image
        });
        (0, generateToken_1.generateTokenAndSetCookie)(newUser.id, res);
        await newUser.save();
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json({
            success: true,
            user: userWithoutPassword,
        });
        //Remove password from the response
        // Exclude password from the response
    }
    catch (error) {
        console.log("Error in sign up controller", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const user = await userModel_1.UserModel.findOne({
            email: email
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid  credentials"
            });
        }
        const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "Invalid  credentials"
            });
        }
        (0, generateToken_1.generateTokenAndSetCookie)(user.id, res);
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            success: true,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.log("Error in login controller");
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({
            success: true,
            message: "Logout successfully"
        });
    }
    catch (error) {
        console.log("Error in Logout controller");
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
async function authCheck(req, res) {
    const user = req.user; // Access user from req.user (custom property)
    try {
        res.status(200).json({ success: true, user: user });
    }
    catch (error) {
        console.log("Error in AuthCheck Controller");
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
