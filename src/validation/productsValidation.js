import { Joi, Segments } from "celebrate";
import { CATEGORIES } from "../constants/categories";
import { isValidObjectId } from "mongoose";

export const getProductsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    category: Joi.string().valid(...CATEGORIES),
    search: Joi.string().allow(""),
    sortBy: Joi.string().valid("_id", "price").default("_id"),
    sortOrder: Joi.string().valid("asc", "desc").default("asc"),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const productIdSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).required(),
    price: Joi.number().positive().precision(2).required(),
    category: Joi.string().valid(...CATEGORIES).required(),
    description: Joi.string().allow(""),
  }),
};

export const updateProductSchema = {
    [Segments.PARAMS]: Joi.object({
        productId: Joi.string().custom(objectIdValidator).required(),
    }),
    [Segments.BODY]: Joi.object({
        name: Joi.string().min(1),
        price: Joi.number().positive().precision(2),
        category: Joi.string().valid(...CATEGORIES),
        description: Joi.string().allow(""),
    }),
}

