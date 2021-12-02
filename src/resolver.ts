import { Customer } from './models/customer';
import { Queue } from './models/queue';
import { Relation } from './models/relation';

import { IResolvers } from 'graphql-tools';

export const resolvers: IResolvers = {
    Query: {
        async getAllCustomers() {
            return await Customer.find({})
        },
        async getCustomer(_, { id }) {
            return await Customer.findById(id)
        },
        async getQueuePosition(parent, args) {
            let relationData: any = await Relation.findOne({ userId: args.userId, queueId: args.queueId })
            if (!relationData) {
                throw new Error('Customer has not assigned with any queue')
            }
            return relationData.position;
        },
        async getAllQueues() {
            return await Queue.find({});
        },
        async getQueue(_, { id }) {
            let queue = await Queue.findById(id)
            if (!queue)
                return []
            return [queue];
        }
    },
    Mutation: {
        async createUser(parent, args) {
            let input = {
                name: args.name,
                email: args.email
            }
            return await Customer.create(input)
        },
        async deleteUser(parent, args) {
            await Customer.findByIdAndDelete(args.id)
            return "Customer Deleted successfully"
        },
        async joinQueue(parent, args) {
            let customer = await Relation.findOne({ userId: args.userId })
            if (customer) {
                return "Customer is already in the queue"
            }
            let queue: any = await Queue.findById(args.queueId)
            if (queue.open && queue.maximumCapacity >= 0) {
                let position = queue.maximumCapacity - 1
                await Relation.create({ userId: args.userId, queueId: args.queueId, position: position })
                await Queue.findByIdAndUpdate(args.queueId, { maximumCapacity: position })
                return "customer has successfully added into the queue"
            } else {
                return "Can not add customer as queue maximum limit has reached"
            }
        },
        async exitQueue(parent, args) {
            let queue: any = await Queue.findById(args.queueId)
            let position = queue.maximumCapacity + 1
            await Relation.deleteOne({ userId: args.userId, queueId: args.queueId })
            await Queue.findByIdAndUpdate(args.queueId, { maximumCapacity: position })
            return "Customer has exited the queue successfully"
        },
        async createQueue(parent, args) {
            let input = {
                open: args.open,
                maximumCapacity: args.maximumCapacity
            }
            return await Queue.create(input);
        },
        async deleteQueue(parent, args) {
            let queuepresent = await Relation.findOne({ queueId: args.id })
            if (queuepresent) {
                return "Can not delete queue as customer is already inside queue"
            }
            await Queue.findByIdAndDelete(args.id)
            return "Queue deleted successfully"
        },
        async openQueue(parent, args) {
            await Queue.findOneAndReplace(args.id, { open: true })
            return "Queue opened successfully"
        },
        async closeQueue(parent, args) {
            await Queue.findOneAndReplace(args.id, { open: false })
            return "Queue closed successfully"
        }
    }
};