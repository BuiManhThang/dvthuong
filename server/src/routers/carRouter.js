import { Router } from 'express'
import carController from '../controllers/carController.js'
import { body } from 'express-validator'

const validators = [
  body('name')
    .trim()
    .isLength({ max: 256, min: 1 })
    .withMessage('Bắt buộc nhập tên sản phẩm, tối đa 256 ký tự')
    .escape(),
  body('banner')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Bắt buộc nhập hình ảnh banner của sản phẩm')
    .escape(),
  body('slogan')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Bắt buộc nhập slogan của sản phẩm')
    .escape(),
  body('subSlogan')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Bắt buộc nhập slogan phụ của sản phẩm')
    .escape(),
  body('deposit')
    .isLength({ min: 1 })
    .withMessage('Bắt buộc nhập số tiền đặt cọc')
    .isNumeric()
    .withMessage('Số tiền phải là số')
    .escape(),
  body('price')
    .isLength({ min: 1 })
    .withMessage('Bắt buộc nhập giá sản phẩm')
    .isNumeric()
    .withMessage('Số tiền phải là số')
    .escape(),
  body('manufacturer')
    .isLength({ min: 1 })
    .withMessage('Bắt buộc nhập Id nhà sản xuất')
    .isMongoId()
    .withMessage('Id nhà sản xuất không đúng định dạng')
    .escape(),
]

const carRouter = Router()

carRouter.get('/q', carController.getCarsByManufacturer)

carRouter.get('/:id', carController.get)

carRouter.get('/', carController.getAll)

carRouter.post('/', validators, carController.create)

carRouter.put('/:id', validators, carController.update)

carRouter.delete('/:id', carController.delete)

export default carRouter
