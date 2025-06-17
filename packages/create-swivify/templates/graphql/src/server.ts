import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from Swivify GraphQL template!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
