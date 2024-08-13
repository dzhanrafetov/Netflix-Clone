"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const envVars_1 = require("./config/envVars");
const app = (0, express_1.default)();
app.use("/api/v1/auth", authRoute_1.default);
const PORT = envVars_1.ENV_VARS.PORT;
app.listen(PORT, () => {
    console.log("Server is running");
});
