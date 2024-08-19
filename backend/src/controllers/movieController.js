"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrendingMovie = getTrendingMovie;
exports.getMovieTrailers = getMovieTrailers;
exports.getMovieDetails = getMovieDetails;
exports.getSimilarMovies = getSimilarMovies;
exports.getMoviesByCategory = getMoviesByCategory;
const tmbdUtil_1 = require("../utils/tmbdUtil");
async function getTrendingMovie(req, res) {
    try {
        const data = await (0, tmbdUtil_1.fetchFromTMBD)("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({ success: true, content: randomMovie });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
async function getMovieTrailers(req, res) {
    try {
        const { id } = req.params;
        const data = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.status(200).json({ success: true, trailers: data.results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
async function getMovieDetails(req, res) {
    try {
        const { id } = req.params;
        const data = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
async function getSimilarMovies(req, res) {
    try {
        const { id } = req.params;
        const data = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
async function getMoviesByCategory(req, res) {
    try {
        const { category } = req.params;
        const data = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
