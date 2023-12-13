"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const Category_controller_1 = require("./Category.controller");
const Category_validation_1 = __importDefault(require("./Category.validation"));
const router = express_1.default.Router();
router.post('/', (0, validationRequest_1.default)(Category_validation_1.default), Category_controller_1.categoryController.createCategory);
router.get('/', Category_controller_1.categoryController.getCategory);
exports.categoryRouter = router;
