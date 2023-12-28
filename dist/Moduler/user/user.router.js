"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/register', (0, validationRequest_1.default)(user_validation_1.userValidation.userValidationSchema), user_controller_1.userController.registerUser);
router.post('/login', (0, validationRequest_1.default)(user_validation_1.userValidation.loginValidationSchema), user_controller_1.userController.login);
router.post('/change-password', (0, auth_1.default)('admin', 'user'), (0, validationRequest_1.default)(user_validation_1.userValidation.changePasswordValidationSchema), user_controller_1.userController.changePassword);
exports.authRouter = router;
