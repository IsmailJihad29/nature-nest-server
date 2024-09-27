import { TProductInterface, TProductModel } from "./product.model";


//* for get products

const getFilteredProducts = async (filters: {
  searchQuery?: string;
  category?: string;
  sortOrder?: string;
  priceRange?: string;
}) => {
  const { searchQuery, category, sortOrder, priceRange } = filters;

  const searchCondition = searchQuery
    ? {
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
        ],
      }
    : {};

  const categoryCondition = category ? { category } : {}; // Filter by category
  const priceCondition = priceRange
    ? {
        price: {
          $gte: Number(priceRange.split('-')[0]),
          $lte: Number(priceRange.split('-')[1]),
        },
      }
    : {};

  let sortCondition = {};
  if (sortOrder === 'low-to-high') {
    sortCondition = { price: 1 }; // Ascending
  } else if (sortOrder === 'high-to-low') {
    sortCondition = { price: -1 }; // Descending
  }

  const result = await TProductModel.find({
    ...searchCondition,
    ...categoryCondition,
    ...priceCondition,
  }).sort(sortCondition);

  return result;
};

//* for get products with optional search query
// const getProductFromDb = async (searchQuery?: string) => {
//   const searchCondition = searchQuery
//     ? {
//         $or: [
//           { title: { $regex: searchQuery, $options: 'i' } }, // case-insensitive search by title
//           { description: { $regex: searchQuery, $options: 'i' } } // case-insensitive search by description
//         ]
//       }
//     : {};

//   const result = await TProductModel.find(searchCondition); // If no searchQuery, returns all products
//   return result;
// };

// const getProductFromDb = async () => {
//     const result = await TProductModel.find();
//     return result;
//   };

//* get single product
const getSingleProductFromDb = async (_id: string) => {
    const result = await TProductModel.findOne({_id});
    return result;
  };

  //* for create products
const createProductIntoDb = async (data: Partial<TProductInterface>) => {
    const result = await TProductModel.create(data);
    return result;
  };

//* update single product 
const updateProductInDb = async (_id: string, updateData: Partial<TProductInterface>) => {
  const result = await TProductModel.findOneAndUpdate({ _id }, updateData, {
    new: true, // This returns the updated document
    runValidators: true, // To run Mongoose validators
  });

    return result;
  };

//* update single product 
const deleteProductInDb = async (_id: string) => {
  const result = await TProductModel.findOneAndDelete({ _id });

    return result;
  };

  export const ProductServices = {
    getFilteredProducts,
    getSingleProductFromDb,
    createProductIntoDb,
    updateProductInDb,
    deleteProductInDb,
  };