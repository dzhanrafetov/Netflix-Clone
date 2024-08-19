"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPerson = searchPerson;
exports.searchMovie = searchMovie;
exports.searchTv = searchTv;
exports.getSearchHistory = getSearchHistory;
exports.removeItemFromSearchHistory = removeItemFromSearchHistory;
const userModel_1 = require("../models/userModel");
const tmbdUtil_1 = require("../utils/tmbdUtil");
async function searchPerson(req, res) {
    const { query } = req.params;
    const user = req.user; // Access user from req.user (custom property)
    try {
        const response = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        if (!user) {
            return res.status(404).send({ success: true, message: "User is undefined" });
        }
        await userModel_1.UserModel.findByIdAndUpdate(user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: Date.now()
                }
            }
        });
        res.status(200).json({ success: true, content: response.results });
    }
    catch (error) {
        console.log("Error in search Person Controller");
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
async function searchMovie(req, res) {
    const { query } = req.params;
    const user = req.user; // Access user from req.user (custom property)
    try {
        const response = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        if (!user) {
            return res.status(404).send({ success: true, message: "User is undefined" });
        }
        await userModel_1.UserModel.findByIdAndUpdate(user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: Date.now()
                }
            }
        });
        res.status(200).json({ success: true, content: response.results });
    }
    catch (error) {
        console.log("Error in search Movie Controller");
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
async function searchTv(req, res) {
    const { query } = req.params;
    const user = req.user; // Access user from req.user (custom property)
    try {
        const response = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        if (!user) {
            return res.status(404).send({ success: true, message: "User is undefined" });
        }
        await userModel_1.UserModel.findByIdAndUpdate(user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "tv",
                    createdAt: Date.now()
                }
            }
        });
        res.status(200).json({ success: true, content: response.results });
    }
    catch (error) {
        console.log("Error in search Tv Controller");
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
async function getSearchHistory(req, res) {
    const user = req.user; // Access user from req.user (custom property)
    try {
        if (!user) {
            return res.status(404).send({ success: true, message: "User is undefined" });
        }
        res.status(200).json({ success: true, content: user.searchHistory });
    }
    catch (error) {
        console.log("Error in getSearchHistory Controller");
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
async function removeItemFromSearchHistory(req, res) {
    const { id } = req.params;
    const user = req.user; // Access user from req.user (custom property)
    try {
        if (!user) {
            return res.status(404).send({ success: true, message: "User is undefined" });
        }
        await userModel_1.UserModel.findByIdAndUpdate(user._id, {
            $pull: {
                searchHistory: { id: Number(id) }
            }
        });
        res.status(200).json({ success: true, message: "Item Removed Successfully" });
    }
    catch (error) {
        console.log("Error in getSearchHistory Controller");
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
