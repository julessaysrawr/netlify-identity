const { ApolloServer, gql } = require("apollo-server-lambda");

// Construct a schema, useing GraphQL schema language
const typeDefs = gql`
type Query {
  todos: [Todo]!
}
type Todo {
  id: ID!
  text: String!
  done: Boolean!
}
type Mutation {
  addTodo(text: String!): Todo
  updateTodoDone(id: ID!): Todo
}
`;
// ! means required

const todos = {};
let todoIndex = 0;

// Provide resolver funtions for your schema fields
const resolvers = {
  Query: {
    todos: () => {
      return Object.values(todos);
    }
  },
  Mutation: {
    addTodo: (_, {text}) => {
      todoIndex++;
      const id = `key-${todoIndex}`;
      todos[id] = { id, text, done: false };
      return todos[id];
    },
    updateTodoDone: (_, {id}) => {
      todos[id].done = true;
      return todos[id];
    }

  }
};


// Provide resolver funtions for your schema fields
// const resolvers = {
//   Query: {
//     hello: () => "Hello World",
//   },
// };

const server = new ApolloServer({
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
exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
