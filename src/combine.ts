import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolver';

const typeDefs = `

type Queue {
    id : ID!
    open : Boolean
    maximumCapacity : Int
}

type Customer {
    id: ID!
    name: String
    email: String
}

type Query {
    getAllCustomers: [Customer]!
    getCustomer(id: ID!): Customer
    getQueuePosition(userId: ID!, queueId: ID!): Int
    getAllQueues: [Queue]!
    getQueue(id: ID!): [Queue]!
}

type Mutation {
    createUser(name: String!, email: String!): Customer!
    deleteUser(id: String!): String!
    joinQueue(userId: ID!, queueId: ID!): String!
    exitQueue(userId: ID!, queueId: ID!): String!
    createQueue(open: Boolean, maximumCapacity: Int!): Queue!
    deleteQueue(id: String!): String!
    openQueue(id: String!): String!
    closeQueue(id: String!): String!
}
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
export default schema;