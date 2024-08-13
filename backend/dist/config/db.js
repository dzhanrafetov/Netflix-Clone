"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envVars_1 = require("./envVars");
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(envVars_1.ENV_VARS.MONGO_URI);
        console.log("Mongo DB connected");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
