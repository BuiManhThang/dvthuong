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
}

const manufacturerController = new ManufacturerController(Manufacturer)

export default manufacturerController
