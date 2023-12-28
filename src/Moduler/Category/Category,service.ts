import { JwtPayload } from "jsonwebtoken";
import { Tcategory } from "./Category.interface";
import { CategoryModel } from "./Category.model";

const createCategoryIntoDB = async (payload: Tcategory, token: JwtPayload) => {
    payload.createdBy = token._id
    const result = await CategoryModel.create(payload)
    return result
}
const getCategoryFromDB = async () => {
    const result = await CategoryModel.find({}).populate({ path: 'createdBy', select: '_id username email role' })
    return result
}

export const categoryService = {
    createCategoryIntoDB,
    getCategoryFromDB
}