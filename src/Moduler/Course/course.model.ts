import { model, Schema } from "mongoose";
import { TCourse, Tdetails, Ttags } from "./course.interface";

const TtagSchema = new Schema<Ttags>({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
})

const TdetailsSchema = new Schema<Tdetails>({
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const TcourseSchema = new Schema<TCourse>({
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
        type: Schema.Types.ObjectId,
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
})

TcourseSchema.pre('save', async function () {
    const startDateString = this?.startDate;
    const endDateString = this?.endDate;
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const weeksDifference = Math.ceil(timeDifference / (1000 * 3600 * 24 * 7));
    this.durationInWeeks = weeksDifference
})

export const courseModel = model<TCourse>("course", TcourseSchema)
