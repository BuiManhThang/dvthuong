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
    const { name, code } = req.body
    if (req.method === 'POST' || req.method === 'PUT') {
      const [foundEntityWidthCode, foundEntityWidthName] = await Promise.all([
        this.model.findOne({ code }).select({ _id: 1 }),
        this.model.findOne({ name }).select({ _id: 1 }),
      ])

      const errors = []

      let manufacturerId = ''
      if (req.method === 'PUT') {
        manufacturerId = req.params.id
      }

      if (
        (foundEntityWidthCode && manufacturerId === '') ||
        (foundEntityWidthCode && manufacturerId !== foundEntityWidthCode._id?.toString())
      ) {
        errors.push({
          param: 'code',
          msg: 'Mã nhà sản xuất đã tồn tại',
        })
      }
      if (
        (foundEntityWidthName && manufacturerId === '') ||
        (foundEntityWidthName && manufacturerId !== foundEntityWidthName._id?.toString())
      ) {
        errors.push({
          param: 'name',
          msg: 'Tên nhà sản xuất đã tồn tại',
        })
      }

      return errors
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

      if (query.searchText) {
        const myRegex = { $regex: `.*${query.searchText}.*`, $options: 'i' }
        filter.$or = [
          {
            code: myRegex,
          },
          {
            name: myRegex,
          },
        ]
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
