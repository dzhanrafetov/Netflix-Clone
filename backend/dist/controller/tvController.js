"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrendingTv = getTrendingTv;
exports.getTvTrailers = getTvTrailers;
exports.getTvDetails = getTvDetails;
exports.getSimilarTvs = getSimilarTvs;
exports.getTvsByCategory = getTvsByCategory;
const tmbdUtil_1 = require("../utils/tmbdUtil");
async function getTrendingTv(req, res) {
    try {
        const data = await (0, tmbdUtil_1.fetchFromTMBD)("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.status(200).json({
            success: true,
            content: randomMovie
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
async function getTvTrailers(req, res) {
    try {
        const { id } = req.params;
        const data = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(200).json({ success: true, tvs: data.results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
async function getTvDetails(req, res) {
    try {
        const { id } = req.params;
        const data = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
async function getSimilarTvs(req, res) {
    try {
        const { id } = req.params;
        const data = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
async function getTvsByCategory(req, res) {
    try {
        const { category } = req.params;
        const data = await (0, tmbdUtil_1.fetchFromTMBD)(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
