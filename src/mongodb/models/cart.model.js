import { Schema, model } from "mongoose";
import { ProductModel } from "./product.model.js";

const carts = 'carts';

const cartSchema = new Schema({
    products: [
        {
            productId: {
            type: Schema.Types.ObjectId,
            ref: ProductModel,
            required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                min: [1, 'No puede haber menos de un producto en el carro']
            }
        }
    ]
})

export const cartModel = new model(carts, cartSchema);