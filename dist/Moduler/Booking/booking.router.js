"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const userRole_1 = require("../../utility/userRole");
const router = express_1.default.Router();
router.post('/create-booking', (0, auth_1.default)(userRole_1.userRole.buyer), (0, validationRequest_1.default)(booking_validation_1.bookingValidation.TbookingValidationSchema), booking_controller_1.bookingController.createBooking);
router.put('/update-booking/:id', (0, auth_1.default)(userRole_1.userRole.buyer), (0, validationRequest_1.default)(booking_validation_1.bookingValidation.TbookingUpdateSchema), booking_controller_1.bookingController.updateBooking);
router.delete('/delete-booking/:id', (0, auth_1.default)(userRole_1.userRole.buyer), booking_controller_1.bookingController.deleteBooking);
router.get('/get-booking', (0, auth_1.default)(userRole_1.userRole.admin), booking_controller_1.bookingController.getBooking);
exports.bookingRouter = router;
