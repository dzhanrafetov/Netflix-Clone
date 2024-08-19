"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchController_1 = require("../controllers/searchController");
const router = express_1.default.Router();
router.get("/person/:query", searchController_1.searchPerson);
router.get("/movie/:query", searchController_1.searchMovie);
router.get("/tv/:query", searchController_1.searchTv);
router.get("/history", searchController_1.getSearchHistory);
router.delete("/history/:id", searchController_1.removeItemFromSearchHistory);
exports.default = router;
