const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;

var client = new faunadb.Client({ secret: process.env.FAUNA });

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

// const todos = {};
// let todoIndex = 0;

// Provide resolver funtions for your schema fields
const resolvers = {
  Query: {
    todos: async (parent, args, { user }) => {
      if (!user) {
        return [];
      } else {
        await client.query(
            q.Paginate(q.Match(q.Index("todos_by_user"), user))
        );
        return results.data.map(([ref, text, done]) => {
          id: ref_id,
          text,
          done
        });
        // return Object.values(todos);
      }  // error handling goes here
    },
  },
  Mutation: {
    // addTodo: (_, { text }) => {
    //   todoIndex++;
    //   const id = `key-${todoIndex}`;
    //   todos[id] = { id, text, done: false };
    //   return todos[id];
    // },
    addTodo: async (_, { text }, { user }) => {
      if(!user) {
        throw new Error("Must be authenticated to insert todos");
      }
      const results = await client.query(q.Create(q.Collection("todos"), {
        data: {
          text,
          done: false,
          owner: user
          }
        })
      )
      return {
        ...results.data,
        id: results.ref.id
      };
    },
    updateTodoDone: async (_, { id }) => {
      // todos[id].done = true;
      // return todos[id];
      if(!user) {
        throw new Error("Must be authenticated to insert todos");
      }
      const results = await client.query(q.Update(q.Ref(q.Collection("todos"), id), {
        data: {
          done: true
        }
      }))
      return {
        ...results.data,
        id: results.ref.id
      };
    },
  },
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
  // this is the lambda request context
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    } else {
      return {};
    }
  },

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
    credentials: true,
  },
});
