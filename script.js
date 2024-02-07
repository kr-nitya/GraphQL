const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define a simple data store
const users = [];

// Define schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }
`);

// Define resolvers
const rootValue = {
  user: ({ id }) => users.find(user => user.id === id),
  users: () => users,
  createUser: ({ input }) => {
    const newUser = { id: String(users.length + 1), ...input };
    users.push(newUser);
    return newUser;
  },
};



// Create an Express app
const app = express();

// Set up GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true, 
    
  })
);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
