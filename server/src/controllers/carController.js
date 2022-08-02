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
}

const carController = new CarController(Car, Manufacturer)

export default carController
