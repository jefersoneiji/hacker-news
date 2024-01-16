import mongoose from 'mongoose'

const local = "mongodb://127.0.0.1:27017/hacker-news"
export const connectToDB = async () => {
    mongoose.connection
        .once('open', () => console.log('connected to database.'))
        .once('error', (err) => console.log('error in database: ', err))
        .once('close', () => console.log('disconnected from database.'))

    await mongoose.connect(process.env.MONGO_URI || local)
}