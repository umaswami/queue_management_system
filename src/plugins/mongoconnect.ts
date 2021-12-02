import mongoose from 'mongoose';
import createMongodbInstance from './mongoinstance';

async function connect() {
    let uri = await createMongodbInstance();
    console.log('---------------uri', uri);
    await mongoose.connect(`${uri}queue_management_system`);
}

export default connect