const { ApolloServer, gql } = require("apollo-server-lambda");

// Construct a schema, useing GraphQL schema language
const typeDefs = gql`
type: Query {
  hello: string
}
`;

// Provide resolver funtions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello World",
  },
};

const Server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL playground interface and GraphQL introspection
  // is disbale in "production" (i.e. when `process.end.NODE_ENV` is `production`),

  // If you'd like to have Graphql playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

// this is an aws lambda compatable signature, because netlify functions are build
// on aws lambda under the hood
exports.handler = server.createHandler();
