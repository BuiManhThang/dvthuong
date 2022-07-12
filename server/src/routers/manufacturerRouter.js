import { Router } from 'express'
import manufacturerController from '../controllers/manufacturerController.js'

const userRouter = Router()

userRouter.get('/:id', manufacturerController.get)

userRouter.get('/', manufacturerController.getAll)

userRouter.post('/', manufacturerController.create)

export default userRouter
