"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.busRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const bus_validation_1 = __importDefault(require("./bus.validation"));
const bus_controller_1 = require("./bus.controller");
const userRole_1 = require("../../utility/userRole");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/create-bus', (0, auth_1.default)(userRole_1.userRole.admin), (0, validationRequest_1.default)(bus_validation_1.default), bus_controller_1.busController.createBus);
router.get('/get-bus', (0, auth_1.default)(userRole_1.userRole.admin), bus_controller_1.busController.getAllBus);
router.get('/get-bus/:id', (0, auth_1.default)(userRole_1.userRole.admin), bus_controller_1.busController.getBus);
router.delete('/delete-bus/:id', (0, auth_1.default)(userRole_1.userRole.admin), bus_controller_1.busController.deleteBus);
exports.busRouter = router;
