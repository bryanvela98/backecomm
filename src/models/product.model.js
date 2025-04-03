import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Static method to handle pagination and filtering
productSchema.statics.getPaginatedProducts = async function ({
  limit = 10,
  page = 1,
  sort,
  query,
}) {
  try {
    const filter = {};
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    const sortOptions = {};
    if (sort) {
      sortOptions.price = sort === "asc" ? 1 : -1;
    }

    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      this.find(filter).sort(sortOptions).skip(skip).limit(parseInt(limit)),
      this.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalProducts / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    return {
      products,
      pagination: {
        totalProducts,
        totalPages,
        prevPage: hasPrevPage ? parseInt(page) - 1 : null,
        nextPage: hasNextPage ? parseInt(page) + 1 : null,
        page: parseInt(page),
        hasPrevPage,
        hasNextPage,
      },
    };
  } catch (error) {
    throw new Error(`Error in getPaginatedProducts: ${error.message}`);
  }
};

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
