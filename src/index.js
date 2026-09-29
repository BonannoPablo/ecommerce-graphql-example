require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const connectDB = require("./db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

async function startServer() {
  await connectDB();

  const app = express();
  const PORT = process.env.PORT || 4000;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use("/graphql", expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  }));

  app.get("/", (req, res) => {
    res.json({
      message: "GraphQL API running",
      endpoint: "/graphql",
      sandbox: "Open Apollo Sandbox at https://studio.apollographql.com/sandbox",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

startServer();
