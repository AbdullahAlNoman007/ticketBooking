"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const Review_controller_1 = require("./Review.controller");
const Review_validation_1 = __importDefault(require("./Review.validation"));
const router = express_1.default.Router();
router.post('/', (0, validationRequest_1.default)(Review_validation_1.default), Review_controller_1.reviewController.createReview);
exports.reviewRouter = router;
