import mongoose from "mongoose";
import { afterAll, beforeAll } from 'vitest'

const connectToTestDB = async (): Promise<typeof mongoose> => {
    return await mongoose.connect(process.env.MONGO_URI as string)
}

const deleteTestDB = () => {
    mongoose.connections.forEach(connection => connection.dropDatabase())
}

beforeAll(async () => { await connectToTestDB() })

afterAll(() => deleteTestDB())