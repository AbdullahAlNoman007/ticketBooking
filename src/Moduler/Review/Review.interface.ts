import { Types } from "mongoose";

export interface Treview {
    courseId: Types.ObjectId;
    rating: number;
    review: string
}




