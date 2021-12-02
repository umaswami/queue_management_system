import { MongoMemoryServer } from 'mongodb-memory-server';

// This will create an new instance of "MongoMemoryServer" and automatically start it
// let mongod;
async function createMongodbInstance() {
    let mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    return uri;
}

// async function StopMongodbInstance() {
//     // The Server can be stopped again with
//     await mongod.stop();
// }

export default createMongodbInstance