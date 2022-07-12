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
}

const manufacturerController = new ManufacturerController(Manufacturer)

export default manufacturerController
