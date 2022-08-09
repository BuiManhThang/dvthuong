import BaseController from './baseController.js'
import Car from '../models/car.js'
import Manufacturer from '../models/manufacturer.js'
import mongoose from 'mongoose'

class CarController extends BaseController {
  constructor(model, manufacturer) {
    super(model)
    this.manufacturer = manufacturer
  }

  getCarsByManufacturer = async (req, res) => {
    try {
      const manufacturerId = req.query.manufacturer
      if (!manufacturerId) {
        return this.clientError(res, [
          {
            param: 'manufacturer',
            msg: 'Bắt buộc điền mã nhà sản xuất',
          },
        ])
      }

      if (!mongoose.Types.ObjectId.isValid(manufacturerId)) {
        return this.clientError(res, [
          {
            param: 'manufacturer',
            msg: 'Mã nhà sản xuất không đúng định dạng',
          },
        ])
      }

      const cars = await this.model.find({ manufacturer: manufacturerId })
      return this.success(res, cars)
    } catch (error) {
      this.serverError(res, error)
    }
  }

  getCarsForHome = async (req, res) => {
    try {
      const manufacturers = await this.manufacturer.find()
      const result = []

      const manufacturersLength = manufacturers.length
      for (let index = 0; index < manufacturersLength; index++) {
        const mnu = manufacturers[index]
        const item = {
          _id: mnu._id,
          name: mnu.name,
          products: [],
        }
        const products = await this.model.find({ manufacturer: mnu._id })
        item.products = [...products]
        result.push(item)
      }

      return this.success(res, result)
    } catch (error) {
      this.serverError(res, error)
    }
  }

  customValidate = async (req) => {
    const { name, manufacturer } = req.body
    const errors = []
    if (req.method === 'POST') {
      const foundCar = await this.model.findOne({ name })
      if (foundCar) {
        errors.push({
          param: 'name',
          msg: 'Tên sản phẩm trùng',
        })
      }
    }

    const foundManufacturer = await this.manufacturer.findOne({ _id: manufacturer })
    if (!foundManufacturer) {
      errors.push({
        param: 'manufacturer',
        msg: 'Mã nhà sản xuất không tồn tại',
      })
    }

    return errors
  }

  getNewCode = async (_, res) => {
    try {
      const cars = await this.model.find().sort({ code: -1 }).limit(1)

      if (cars.length > 0) {
        const newestCar = cars[0]
        const newestCarCode = newestCar.code

        const codeArr = newestCarCode.split('.')
        const codeNumber = parseInt(codeArr[1])

        const newCodeNumber = codeNumber + 1
        const newCode = `P.${newCodeNumber.toString().padStart(4, '0')}`
        return this.success(res, newCode)
      }

      return this.success(res, 'P.0001')
    } catch (error) {
      return this.serverError(res, error)
    }
  }

  get = async (req, res) => {
    try {
      const car = await this.model.findOne({ _id: req.params.id }).populate('manufacturer')

      if (!car) {
        return this.notFound(res)
      }

      return this.success(res, car)
    } catch (error) {
      return this.serverError(res, error)
    }
  }
}

const carController = new CarController(Car, Manufacturer)

export default carController
