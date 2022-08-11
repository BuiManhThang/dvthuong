import Manufacturer from '../models/manufacturer.js'
import BaseController from './baseController.js'
import mongoose from 'mongoose'

class ManufacturerController extends BaseController {
  /**
   * Constructor
   * @param {mongoose.Model} model
   */
  constructor(model) {
    super(model)
  }

  customValidate = async (req) => {
    const { name } = req.body
    if (req.method === 'POST') {
      const foundEntity = await this.model.findOne({ name })
      if (foundEntity) {
        return [
          {
            param: 'name',
            msg: 'Tên nhà sản xuất đã tồn tại',
          },
        ]
      }
    }
    return []
  }

  getNewCode = async (_, res) => {
    try {
      const manufacturer = await this.model.find().sort({ code: -1 }).limit(1)

      if (manufacturer.length > 0) {
        const newestCar = manufacturer[0]
        const newestCarCode = newestCar.code

        const codeArr = newestCarCode.split('.')
        const codeNumber = parseInt(codeArr[1])

        const newCodeNumber = codeNumber + 1
        const newCode = `M.${newCodeNumber.toString().padStart(4, '0')}`
        return this.success(res, newCode)
      }

      return this.success(res, 'M.0001')
    } catch (error) {
      return this.serverError(res, error)
    }
  }

  getPaging = async (req, res) => {
    try {
      const query = req.query
      const filter = {}
      const sort = {}

      if (query.sort) {
        const sortArr = query.sort.split('|')
        const key = sortArr[0]
        const direction = sortArr[1]
        sort[key] = parseInt(direction)
      }

      const pageIndex = parseInt(query.pageIndex)
      const pageSize = parseInt(query.pageSize)

      const limit = (pageIndex - 1) * pageSize + pageSize
      const skip = (pageIndex - 1) * pageSize

      const [manufacturers, numberManufacturers] = await Promise.all([
        this.model.find(filter).sort(sort).skip(skip).limit(limit),
        this.model.countDocuments(filter),
      ])

      return this.success(res, {
        pageData: manufacturers,
        totalRecords: numberManufacturers,
      })
    } catch (error) {
      return this.serverError(res, error)
    }
  }
}

const manufacturerController = new ManufacturerController(Manufacturer)

export default manufacturerController
