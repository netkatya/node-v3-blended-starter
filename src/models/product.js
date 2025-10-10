
import { model, Schema } from "mongoose";
import { CATEGORIES } from "../constants/categories";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: [...CATEGORIES],
            required: true,
            default: 'other',
        },
        description: {
            type: String,
            required: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }

)

export const Product = model('Product', productSchema);
