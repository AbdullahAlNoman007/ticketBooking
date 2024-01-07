"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const userRole_1 = require("../../utility/userRole");
const router = express_1.default.Router();
router.post('/login', (0, validationRequest_1.default)(auth_validation_1.authValidation.logInvalidationSchema), auth_controller_1.authController.login);
router.post('/change-password', (0, auth_1.default)(userRole_1.userRole.admin, userRole_1.userRole.buyer, userRole_1.userRole.driver, userRole_1.userRole.seller), (0, validationRequest_1.default)(auth_validation_1.authValidation.changePasswordValidationSchema), auth_controller_1.authController.changePassword);
router.post('/forget-password', (0, validationRequest_1.default)(auth_validation_1.authValidation.forgetpasswordValidationSchema), auth_controller_1.authController.forgetPassword);
router.post('/reset-password', (0, validationRequest_1.default)(auth_validation_1.authValidation.resetpasswordValidationSchema), auth_controller_1.authController.resetPassword);
exports.authRouter = router;
