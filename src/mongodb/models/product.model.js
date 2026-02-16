import { Schema, model } from "mongoose";

const products = 'products';

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            index: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true,
            unique: true
        },
        thumbnails: String,
        stock: {
            type: Number,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
    }
);

export const ProductModel = new model(products, productSchema);