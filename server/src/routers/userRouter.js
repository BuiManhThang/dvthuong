import { Router } from 'express'
import authValidation from '../validations/authValidation.js'
import {
  getUsers,
  createUser,
  getUser,
  signIn,
  getCurrentUser,
  signOut,
} from '../controllers/userController.js'

const userRouter = Router()

userRouter.get('/currentUser', authValidation, getCurrentUser)

userRouter.get('/sign-out', signOut)

userRouter.get('/:userId', authValidation, getUser)

userRouter.get('/', getUsers)

userRouter.post('/sign-in', signIn)

userRouter.post('/', createUser)

export default userRouter
