import User from '../models/user.js'
import Cart from '../models/cart.js'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.json({
      success: true,
      data: users,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Server error',
      errors: error,
    })
  }
}

export const createUser = [
  body('email')
    .trim()
    .isLength({ max: 256, min: 1 })
    .withMessage('Bắt buộc nhập email, không quá 256 ký tự')
    .isEmail()
    .withMessage('Sai định dạng email')
    .escape(),
  body('password')
    .isLength({ max: 32, min: 6 })
    .withMessage('Bắt buộc nhập mật khẩu, ít nhất 6 và không quá 32 ký tự')
    .escape(),
  body('confirmPassword')
    .isLength({ max: 32, min: 6 })
    .withMessage('Bắt buộc nhập xác nhận mật khẩu')
    .escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.errors,
        })
      }

      const { email, password, confirmPassword, address } = req.body

      const foundUserByEmail = await User.findOne({ email })
      if (foundUserByEmail) {
        return res.status(400).json({
          success: false,
          errors: [{ param: 'email', msg: 'Email đã tồn tại trong hệ thống' }],
        })
      }

      const passwordRegex = /^[a-zA-Z](?=.*?[0-9])/i
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          success: false,
          errors: [{ param: 'password', msg: 'Mật khẩu phải có it nhất 1 số không đứng đầu' }],
        })
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          errors: [{ param: 'confirmPassword', msg: 'Mật khẩu không trùng nhau' }],
        })
      }

      // encode password
      const salt = await bcrypt.genSalt(10)
      const encodedPassword = await bcrypt.hash(password, salt)

      const fullName = email.split('@')[0]
      const newUser = new User({
        fullName,
        email,
        password: encodedPassword,
        address,
      })

      const savedUser = await newUser.save()

      const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
      })
      res.cookie('token', token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })

      const cart = new Cart({
        user: savedUser._id,
        cars: [],
      })

      await cart.save()

      const { password: userPassword, ...info } = savedUser.toJSON()
      return res.json({ success: true, data: info })
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Server error',
        errors: error,
      })
    }
  },
]

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId
    const foundUser = await User.findOne({ _id: userId })
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        msg: 'Không tìm thấy người dùng',
      })
    }
    const { password, ...info } = foundUser.toJSON()

    const cart = await Cart.findOne({ user: info._id })
    let products = []
    if (cart) {
      products = cart.cars
    }

    return res.json({
      success: true,
      data: { ...info, products },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Server error',
      errors: error,
    })
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        errors: [{ param: 'email;password', msg: 'Email hoặc mật khẩu không đúng' }],
      })
    }

    const isSuccess = await bcrypt.compare(password, foundUser.password)
    if (!isSuccess) {
      return res.status(401).json({
        success: false,
        errors: [{ param: 'email;password', msg: 'Email hoặc mật khẩu không đúng' }],
      })
    }

    const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    })
    res.cookie('token', token, {
      maxAge: 86400000,
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    })

    const { password: userPassword, ...info } = foundUser.toJSON()

    const cart = await Cart.findOne({ user: info._id })
    let products = []
    if (cart) {
      products = cart.cars
    }

    return res.json({
      success: true,
      data: { ...info, products },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Server error',
      errors: error,
    })
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.body.userId
    const user = await User.findOne({ _id: userId })

    if (!user) {
      return res.sendStatus(401)
    }

    const { password, ...info } = user.toJSON()

    const cart = await Cart.findOne({ user: info._id })
    let products = []
    if (cart) {
      products = cart.cars
    }

    return res.json({
      success: true,
      data: { ...info, products },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Server error',
      errors: error,
    })
  }
}

export const signOut = async (req, res) => {
  try {
    res.clearCookie('token')

    return res.json({
      success: true,
      data: true,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Server error',
      errors: error,
    })
  }
}
