import { Router } from 'express'
import manufacturerController from '../controllers/manufacturerController.js'
import { body } from 'express-validator'

const validators = [
  body('name').trim().isLength({ min: 1 }).withMessage('Bắt buộc nhập tên nhà sản xuất').escape(),
]

const userRouter = Router()

userRouter.get('/:id', manufacturerController.get)

userRouter.get('/', manufacturerController.getAll)

userRouter.post('/', validators, manufacturerController.create)

export default userRouter
