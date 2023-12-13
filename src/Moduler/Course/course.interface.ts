import { Types } from "mongoose";

export type Ttags = {
    name: string;
    isDeleted: boolean
}
export type Tdetails = {
    level: string;
    description: string
}

export type TCourse = {
    title: string;
    instructor: string;
    categoryId: Types.ObjectId;
    price: number;
    tags: Ttags[];
    startDate: string;
    endDate: string;
    language: string;
    provider: string;
    durationInWeeks: number;
    details: Tdetails
}

export type Tsort = {
    _id: Types.ObjectId,
    averageRating: number,
    reviewCount: number
}


