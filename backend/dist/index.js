"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const movieRoute_1 = __importDefault(require("./routes/movieRoute"));
const tvRoute_1 = __importDefault(require("./routes/tvRoute"));
const envVars_1 = require("./config/envVars");
const db_1 = require("./config/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const protectRoute_1 = require("./middleware/protectRoute");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/auth", authRoute_1.default);
app.use("/api/v1/movie", protectRoute_1.protectRoute, movieRoute_1.default);
app.use("/api/v1/tv", protectRoute_1.protectRoute, tvRoute_1.default);
const PORT = envVars_1.ENV_VARS.PORT;
app.listen(PORT, () => {
    (0, db_1.connectDB)();
    console.log("Server is running");
});
