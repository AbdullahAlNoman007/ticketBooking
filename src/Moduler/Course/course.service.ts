
import AppError from "../../Error/AppError";
import { reviewModel } from "../Review/Review.model";
import { TCourse, Tsort } from "./course.interface";
import { courseModel } from "./course.model";

type Ttags = {
    name: string;
    isDeleted: boolean
}

const createCourseIntoDB = async (payload: TCourse) => {
    const result1 = await courseModel.create(payload)
    return result1


}
const getCourseFromDB = async (query: Record<string, unknown>) => {

    const queryObj = { ...query }
    const queryBuilder = courseModel.find()


    const excludeFields = ['sort', 'limit', 'page', 'fields', "startDate", "endDate", "minPrice", "maxPrice", 'tags', "sortOder", "level"]

    excludeFields.forEach(el => delete queryObj[el])
    const filterQuery = queryBuilder.find(queryObj)

    let tag: any = {}
    if (query?.tags) {
        tag[`tags.name`] = query?.tags
    }
    const tagsQuery = filterQuery.find(tag)

    let min = query?.minPrice || 0
    let max = query?.maxPrice || 100000000

    const priceQuery = tagsQuery.find({ price: { $gte: min, $lte: max } })

    const dateQuery = priceQuery.find({
        $and: [
            { startDate: { $gte: (query?.startDate || "1971-12-16") as string } },
            { endDate: { $lte: (query?.endDate || "3071-12-16") as string } },
        ],
    });

    let details: any = {}
    if (query?.level) {
        details[`details.level`] = query?.level
    }
    const levelQuery = dateQuery.find(details)

    let sorting: any = {};
    let sort = 'createdAt'
    if (query?.sort) {
        sort = query?.sort as string
    }
    const sortQuery = levelQuery.sort(sort)

    if (query?.sortOder === 'asc') {
        sorting[sort] = 1;
    } else if (query?.sortOder === 'desc') {
        sorting[sort] = -1;
    }
    else {
        sorting[sort] = 1;
    }
    const oderSortQuery = sortQuery.sort(sorting)

    let limit = Number(query?.limit) || 0
    let page = Number(query?.page) || 1
    let skip = (page - 1) * limit || 0

    const paginationQuery = oderSortQuery.skip(skip)
    const limitQuery = await paginationQuery.limit(limit)
    return limitQuery

}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const exists = await courseModel.findById(id)
    if (!exists) {
        throw new AppError(404, "Course doesn't Exists")
    }
    const { tags, details, ...remaining } = payload
    const modifiedUpdatedData: Record<string, unknown> = { ...remaining }
    const oneCouse = await courseModel.findById(id)
    if (details && Object.keys(details).length) {
        for (const [key, value] of Object.entries(details)) {
            modifiedUpdatedData[`details.${key}`] = value
        }
    }
    if (tags && tags.length) {
        const updateTags = [...tags as Ttags[], ...oneCouse?.tags as Ttags[]];
        const newUpdateTags = updateTags.filter((tag) => !tag.isDeleted)
        const deleteTags = updateTags.filter((tag) => tag.isDeleted)[0]
        const perfectUpdateTags = newUpdateTags.filter((tag) => tag.name != deleteTags?.name)
        modifiedUpdatedData['tags'] = perfectUpdateTags
    }
    const result = await courseModel.findByIdAndUpdate(id, modifiedUpdatedData, { new: true, upsert: true })
    return result

}
const getCourseReviewFromDB = async (id: string) => {
    const exists = await courseModel.findById(id)
    if (!exists) {
        throw new AppError(404, "Course doesn't Exists")
    }
    const course = await courseModel.findById(id)
    const courseId = course?._id
    const reviews = await reviewModel.find({ courseId })
    const result = {
        course,
        reviews
    }
    return result
}
const bestCourseInDB = async () => {
    const reviewArray = await reviewModel.aggregate([
        {
            $group: {
                _id: "$courseId",
                averageRating: { $avg: "$rating" },
                reviewCount: { $count: {} }
            }
        }
    ])
    function sortFunc(a: Tsort, b: Tsort) {
        return a.averageRating - b.averageRating
    }
    reviewArray.sort(sortFunc)
    const bestReview: Tsort = reviewArray[reviewArray.length - 1]
    const course = await courseModel.findById(bestReview._id)
    const result = {
        course,
        averageRating: bestReview?.averageRating,
        reviewCount: bestReview?.reviewCount
    }
    return result
}

export const courseService = {
    createCourseIntoDB,
    getCourseFromDB,
    updateCourseIntoDB,
    getCourseReviewFromDB,
    bestCourseInDB
}