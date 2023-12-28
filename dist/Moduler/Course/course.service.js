"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const Category_model_1 = require("../Category/Category.model");
const Review_model_1 = require("../Review/Review.model");
const course_model_1 = require("./course.model");
const createCourseIntoDB = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_model_1.CategoryModel.findById(payload.categoryId);
    if (!category) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This category doesn't exists!");
    }
    payload.createdBy = token._id;
    const result1 = yield course_model_1.courseModel.create(payload);
    return result1;
});
const getCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    const queryBuilder = course_model_1.courseModel.find().populate({ path: 'createdBy', select: '_id username email role' });
    const excludeFields = ['sort', 'limit', 'page', 'fields', "startDate", "endDate", "minPrice", "maxPrice", 'tags', "sortOder", "level"];
    excludeFields.forEach(el => delete queryObj[el]);
    const filterQuery = queryBuilder.find(queryObj);
    let tag = {};
    if (query === null || query === void 0 ? void 0 : query.tags) {
        tag[`tags.name`] = query === null || query === void 0 ? void 0 : query.tags;
    }
    const tagsQuery = filterQuery.find(tag);
    let min = (query === null || query === void 0 ? void 0 : query.minPrice) || 0;
    let max = (query === null || query === void 0 ? void 0 : query.maxPrice) || 100000000;
    const priceQuery = tagsQuery.find({ price: { $gte: min, $lte: max } });
    const dateQuery = priceQuery.find({
        $and: [
            { startDate: { $gte: ((query === null || query === void 0 ? void 0 : query.startDate) || "1971-12-16") } },
            { endDate: { $lte: ((query === null || query === void 0 ? void 0 : query.endDate) || "3071-12-16") } },
        ],
    });
    let details = {};
    if (query === null || query === void 0 ? void 0 : query.level) {
        details[`details.level`] = query === null || query === void 0 ? void 0 : query.level;
    }
    const levelQuery = dateQuery.find(details);
    let sorting = {};
    let sort = 'createdAt';
    if (query === null || query === void 0 ? void 0 : query.sort) {
        sort = query === null || query === void 0 ? void 0 : query.sort;
    }
    const sortQuery = levelQuery.sort(sort);
    if ((query === null || query === void 0 ? void 0 : query.sortOder) === 'asc') {
        sorting[sort] = 1;
    }
    else if ((query === null || query === void 0 ? void 0 : query.sortOder) === 'desc') {
        sorting[sort] = -1;
    }
    else {
        sorting[sort] = 1;
    }
    const oderSortQuery = sortQuery.sort(sorting);
    let limit = Number(query === null || query === void 0 ? void 0 : query.limit) || 0;
    let page = Number(query === null || query === void 0 ? void 0 : query.page) || 1;
    let skip = (page - 1) * limit || 0;
    const paginationQuery = oderSortQuery.skip(skip);
    const limitQuery = yield paginationQuery.limit(limit);
    return limitQuery;
});
const updateCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield course_model_1.courseModel.findById(id);
    if (!exists) {
        throw new AppError_1.default(404, "Course doesn't Exists");
    }
    const { tags, details } = payload, remaining = __rest(payload, ["tags", "details"]);
    const modifiedUpdatedData = Object.assign({}, remaining);
    const oneCouse = yield course_model_1.courseModel.findById(id);
    if (details && Object.keys(details).length) {
        for (const [key, value] of Object.entries(details)) {
            modifiedUpdatedData[`details.${key}`] = value;
        }
    }
    if (tags && tags.length) {
        const updateTags = [...tags, ...oneCouse === null || oneCouse === void 0 ? void 0 : oneCouse.tags];
        const newUpdateTags = updateTags.filter((tag) => !tag.isDeleted);
        const deleteTags = updateTags.filter((tag) => tag.isDeleted)[0];
        const perfectUpdateTags = newUpdateTags.filter((tag) => tag.name != (deleteTags === null || deleteTags === void 0 ? void 0 : deleteTags.name));
        modifiedUpdatedData['tags'] = perfectUpdateTags;
    }
    const result = yield course_model_1.courseModel.findByIdAndUpdate(id, modifiedUpdatedData, { new: true, upsert: true }).populate({ path: 'createdBy', select: '_id username email role' });
    return result;
});
const getCourseReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield course_model_1.courseModel.findById(id);
    if (!exists) {
        throw new AppError_1.default(404, "Course doesn't Exists");
    }
    const course = yield course_model_1.courseModel.findById(id).populate({ path: 'createdBy', select: '_id username email role' });
    const courseId = course === null || course === void 0 ? void 0 : course._id;
    const reviews = yield Review_model_1.reviewModel.find({ courseId }).populate({ path: 'createdBy', select: '_id username email role' });
    const result = {
        course,
        reviews
    };
    return result;
});
const bestCourseInDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviewArray = yield Review_model_1.reviewModel.aggregate([
        {
            $group: {
                _id: "$courseId",
                averageRating: { $avg: "$rating" },
                reviewCount: { $count: {} }
            }
        }
    ]);
    function sortFunc(a, b) {
        return a.averageRating - b.averageRating;
    }
    reviewArray.sort(sortFunc);
    const bestReview = reviewArray[reviewArray.length - 1];
    const course = yield course_model_1.courseModel.findById(bestReview._id).populate({ path: 'createdBy', select: '_id username email role' });
    const result = {
        course,
        averageRating: bestReview === null || bestReview === void 0 ? void 0 : bestReview.averageRating,
        reviewCount: bestReview === null || bestReview === void 0 ? void 0 : bestReview.reviewCount
    };
    return result;
});
exports.courseService = {
    createCourseIntoDB,
    getCourseFromDB,
    updateCourseIntoDB,
    getCourseReviewFromDB,
    bestCourseInDB
};
