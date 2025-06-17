import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
  }
  type Query {
    users: [User!]!
  }
  type Mutation {
    createUser(email: String!, name: String): User!
  }
`;

const resolvers = {
  Query: {
    users: async () => prisma.user.findMany(),
  },
  Mutation: {
    createUser: async (_: any, args: { email: string; name?: string }) => {
      return prisma.user.create({ data: args });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
