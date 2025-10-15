import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { CATEGORIES } from '../constants/categories.js';

export const getProductsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    category: Joi.string().valid(...CATEGORIES),
    search: Joi.string().allow(''),
    sortBy: Joi.string().valid('_id', 'price').default('_id'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
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
    name: Joi.string()
      .min(1)
      .required()
      .messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name should have at least {#limit} characters',
        'any.required': 'Name is a required field',
      }),
    price: Joi.number()
      .positive()
      .precision(2)
      .required()
      .messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'number.precision': 'Price must have at most {#limit} decimal places',
        'any.required': 'Price is a required field',
      }),
    category: Joi.string()
      .valid(...CATEGORIES)
      .required()
      .messages({
        'any.only': `Category must be one of [${CATEGORIES.join(', ')}]`,
        'any.required': 'Category is a required field',
      }),
    description: Joi.string()
      .allow('')
      .messages({ 'string.base': 'Description must be a string' }),
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
    description: Joi.string().allow(''),
  }),
};
