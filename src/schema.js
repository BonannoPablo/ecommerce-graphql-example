const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
    category: String!
    description: String
    createdAt: String
    updatedAt: String
  }

  input FilterProductsInput {
    category: String
    minPrice: Float
    maxPrice: Float
    inStock: Boolean
    search: String
  }

  input UpdateProductInput {
    name: String
    price: Float
    stock: Int
    category: String
    description: String
  }

  type Query {
    products(filter: FilterProductsInput): [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    createProduct(
      name: String!
      price: Float!
      stock: Int!
      category: String!
      description: String
    ): Product
    deleteProduct(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
