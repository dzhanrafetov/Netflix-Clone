"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAndSetCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envVars_1 = require("../config/envVars");
const generateTokenAndSetCookie = (userId, res) => {
    const jwtSecret = envVars_1.ENV_VARS.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT secret is not defined in environment variables');
    }
    const token = jsonwebtoken_1.default.sign({ userId }, jwtSecret, { expiresIn: '15d' });
    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 25 * 60 * 60 * 1000, // 15 days in MS
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks,make it not be accessed by JS
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: envVars_1.ENV_VARS.NODE_ENV !== "development",
    });
    return token;
};
exports.generateTokenAndSetCookie = generateTokenAndSetCookie;
