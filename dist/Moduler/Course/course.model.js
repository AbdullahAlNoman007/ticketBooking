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
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseModel = void 0;
const mongoose_1 = require("mongoose");
const TtagSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
});
const TdetailsSchema = new mongoose_1.Schema({
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
const TcourseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    instructor: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    price: {
        type: Number,
        required: true
    },
    tags: [TtagSchema],
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    durationInWeeks: {
        type: Number
    },
    details: TdetailsSchema
});
TcourseSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const startDateString = this === null || this === void 0 ? void 0 : this.startDate;
        const endDateString = this === null || this === void 0 ? void 0 : this.endDate;
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const weeksDifference = Math.ceil(timeDifference / (1000 * 3600 * 24 * 7));
        this.durationInWeeks = weeksDifference;
    });
});
exports.courseModel = (0, mongoose_1.model)("course", TcourseSchema);
