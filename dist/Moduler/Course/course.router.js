"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const course_controller_1 = require("./course.controller");
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router.post('/course', (0, validationRequest_1.default)(course_validation_1.courseZodValidation.TCoursevalidationSchema), course_controller_1.courseController.createCourse);
router.get('/courses', course_controller_1.courseController.getCourse);
router.put('/courses/:id', (0, validationRequest_1.default)(course_validation_1.courseZodValidation.TCourseupdatevalidationSchema), course_controller_1.courseController.updateCourse);
router.get('/courses/:id/reviews', course_controller_1.courseController.getCourseReview);
router.get('/course/best', course_controller_1.courseController.bestCourse);
exports.courseRouter = router;
