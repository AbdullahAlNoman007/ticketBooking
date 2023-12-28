"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Category_router_1 = require("../Moduler/Category/Category.router");
const course_router_1 = require("../Moduler/Course/course.router");
const Review_router_1 = require("../Moduler/Review/Review.router");
const user_router_1 = require("../Moduler/user/user.router");
const router = express_1.default.Router();
const moduleRouters = [
    {
        path: '/',
        router: course_router_1.courseRouter
    },
    {
        path: '/categories',
        router: Category_router_1.categoryRouter
    },
    {
        path: '/reviews',
        router: Review_router_1.reviewRouter
    },
    {
        path: '/auth',
        router: user_router_1.authRouter
    },
];
moduleRouters.map(route => router.use(route.path, route.router));
exports.default = router;
