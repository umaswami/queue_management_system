import express from 'express';
import { ApolloServer } from 'apollo-server-express'
import schema from './combine';
// import connect from './plugins/mongoconnect'
import mongoose from 'mongoose';
import createMongodbInstance from './plugins/mongoinstance';
const app = express();

mongoose.Promise = global.Promise;
async function connect() {
    let uri = await createMongodbInstance();
    console.log('-------------uri', uri)
    let connection = await mongoose.connect(`${uri}queue_management_system`);
}

async function startServer() {
    const server: any = new ApolloServer({
        schema: schema
    });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
}
connect();
startServer();
app.listen({ port: 4000 }, () => {
    console.log(`Apollo server is running on http://localhost:4000/graphql`)
})