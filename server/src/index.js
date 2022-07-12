import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

// Connect DB
import connectDB from './database/connect.js'

// Routers
import userRouter from './routers/userRouter.js'
import manufacturerRouter from './routers/manufacturerRouter.js'

dotenv.config()
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL

const app = express()

connectDB(MONGODB_URL)

// Middleware
app.use(morgan('dev'))
app.use(urlencoded())
app.use(json())
app.use(cookieParser())

// Use Routers
app.use('/users', userRouter)
app.use('/manufacturers', manufacturerRouter)

app.get('/products', (req, res) => {
  return res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`)
})
