import { Tcategory } from "./Category.interface";
import { CategoryModel } from "./Category.model";

const createCategoryIntoDB = async (payload: Tcategory) => {
    const result = await CategoryModel.create(payload)
    return result
}
const getCategoryFromDB = async () => {
    const result = await CategoryModel.find({})
    return result
}

export const categoryService = {
    createCategoryIntoDB,
    getCategoryFromDB
}