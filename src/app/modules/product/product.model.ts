import { model, Schema } from "mongoose";

export type TProductInterface ={
    title: string,
    price: number,
    category: string,
    quantity: number,
    description: string,
    rating: number,
    image: string,
    createdAt: Date,
}



const TProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
},
{ timestamps: true });
export const TProductModel = model<TProductInterface>('Product', TProductSchema);


