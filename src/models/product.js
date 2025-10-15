import { model, Schema } from 'mongoose';
import { CATEGORIES } from '../constants/categories.js';

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
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

productSchema.index(
    { name: 'text' },
    {
      name: 'StudentTextIndex',
      weights: { name: 10 },
      default_language: 'english',
    },
  );

export const Product = model('Product', productSchema);
