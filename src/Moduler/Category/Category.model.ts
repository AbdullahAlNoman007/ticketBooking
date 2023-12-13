import { model, Schema } from "mongoose";
import { Tcategory } from "./Category.interface";

const CategorySchema = new Schema<Tcategory>({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export const CategoryModel = model<Tcategory>("category", CategorySchema)