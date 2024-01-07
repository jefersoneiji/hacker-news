import mongoose from 'mongoose'

export const connectToDB = async () => {
    mongoose.connection
        .once('open', () => console.log('connected to database.'))
        .once('error', (err) => console.log('error in database: ', err))
        .once('close', () => console.log('disconnected from database.'))

    await mongoose.connect('mongodb://127.0.0.1:27017/hacker-news')
}