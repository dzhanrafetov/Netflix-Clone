"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFromTMBD = void 0;
const axios_1 = __importDefault(require("axios"));
const envVars_1 = require("../config/envVars");
const fetchFromTMBD = async (url) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + envVars_1.ENV_VARS.TMDB_API_KEY
        }
    };
    const response = await axios_1.default.get(url, options);
    if (response.status !== 200) {
        throw new Error("Failed to fetch data from TMBD" + response.statusText);
    }
    return response.data;
};
exports.fetchFromTMBD = fetchFromTMBD;
