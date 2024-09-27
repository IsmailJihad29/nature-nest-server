import { z } from "zod";


export const ProductZodSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }), 
    price: z.number().min(0, { message: "Price must be a non-negative number" }), 
    category: z.string().min(1, { message: "Category is required" }), 
    quantity: z.number().int().min(1, { message: "Quantity must be  non-negative and minimum one" }),
    description: z.string().min(1, { message: "Description is required" }),
    rating: z.number().min(0).max(5).optional(), 
    image: z.string().url({ message: "Image must be a valid URL" }),
  });

