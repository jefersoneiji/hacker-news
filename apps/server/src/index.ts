import { app } from "./app"
import { connectToDB } from "./database"

const bootstrap = async () => {
    try {
        await connectToDB()

    } catch (error) {
        console.error('unable to connect to database!', error)
        process.exit(1)
    }

    const PORT = 4000
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}/graphql`)
    })
}

bootstrap()