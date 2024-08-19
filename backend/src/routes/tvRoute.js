"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tvController_1 = require("../controllers/tvController");
const router = express_1.default.Router();
router.get("/trending", tvController_1.getTrendingTv);
router.get("/:id/trailers", tvController_1.getTvTrailers);
router.get("/:id/details", tvController_1.getTvDetails);
router.get("/:id/similar", tvController_1.getSimilarTvs);
router.get("/:category", tvController_1.getTvsByCategory);
exports.default = router;
