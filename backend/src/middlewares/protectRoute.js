"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const envVars_1 = require("../config/envVars");
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
        }
        if (!(envVars_1.ENV_VARS.JWT_SECRET)) {
            return res.status(401).json({ success: false, message: "Unauthorized - ENV_VARS.JWT_SECRET Undefined" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, envVars_1.ENV_VARS.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: " Unauthorized - No Token Provided" });
        }
        const user = await userModel_1.UserModel.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized - User Not Found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in protectRoute middleware");
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
exports.protectRoute = protectRoute;
