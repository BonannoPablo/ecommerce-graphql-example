const Product = require("./models/Product");

const resolvers = {
  Query: {
    products: async (_, { filter }) => {
      const query = {};

      if (filter) {
        if (filter.category) {
          query.category = { $regex: filter.category, $options: "i" };
        }
        if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
          query.price = {};
          if (filter.minPrice !== undefined) query.price.$gte = filter.minPrice;
          if (filter.maxPrice !== undefined) query.price.$lte = filter.maxPrice;
        }
        if (filter.inStock !== undefined) {
          query.stock = filter.inStock ? { $gt: 0 } : { $eq: 0 };
        }
        if (filter.search) {
          query.$or = [
            { name: { $regex: filter.search, $options: "i" } },
            { description: { $regex: filter.search, $options: "i" } },
          ];
        }
      }

      return Product.find(query).sort({ createdAt: -1 });
    },

    product: async (_, { id }) => {
      return Product.findById(id);
    },
  },

  Mutation: {
    createProduct: async (_, { name, price, stock, category, description }) => {
      const product = new Product({ name, price, stock, category, description });
      return product.save();
    },

    updateProduct: async (_, { id, input }) => {
      return Product.findByIdAndUpdate(id, input, { new: true });
    },

    deleteProduct: async (_, { id }) => {
      const result = await Product.findByIdAndDelete(id);
      return result !== null;
    },
  },
};

module.exports = resolvers;
