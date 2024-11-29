import express from "express";
import { createServer } from 'http';
import 'dotenv/config'
import cors from 'cors'
import router from './router/router'

import mongoose from "mongoose";


// Express-server
const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: "*",
        credentials: true
    }
))
app.use('/server-side', router)

// Подключение к нашей БД через Mongoose
mongoose.connect(process.env.MONGO_URI as string)
.then(() => console.log('Connected to MongoDB with Mongoose!'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));


const server = createServer(app)
const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server is working on ${PORT} port`)
})
