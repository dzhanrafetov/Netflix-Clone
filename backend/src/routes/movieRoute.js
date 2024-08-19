"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const router = express_1.default.Router();
router.get("/trending", movieController_1.getTrendingMovie);
router.get("/:id/trailers", movieController_1.getMovieTrailers);
router.get("/:id/details", movieController_1.getMovieDetails);
router.get("/:id/similar", movieController_1.getSimilarMovies);
router.get("/:category", movieController_1.getMoviesByCategory);
exports.default = router;
