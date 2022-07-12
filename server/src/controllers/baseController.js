import mongoose from 'mongoose'
import { validationResult } from 'express-validator'

class BaseController {
  /**
   * Constructor
   * @param {mongoose.Model} model
   * @param {ValidationChain[]} validators
   */
  constructor(model, validators = []) {
    this.model = model
    this.validators = validators
    this.expectPropertyName = ['_id', 'updatedAt', 'createdAt', '__v']
  }

  /**
   * Get all entities
   * @param {Request} req
   * @param {Response} res
   */
  getAll = async (_, res) => {
    try {
      const entities = await this.model.find()
      return res.json({
        success: true,
        data: entities,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        errors: [{ param: 'server', msg: 'Server error', value: error }],
      })
    }
  }

  /**
   * Get entity by it's id
   * @param {Request} req
   * @param {Response} res
   */
  get = async (req, res) => {
    try {
      const id = req.params.id
      const entity = await this.model.findOne({ _id: id })
      if (!entity) {
        return res.status(404).json({
          success: false,
          errors: [{ param: 'id', msg: 'Not found' }],
        })
      }
      return res.json({
        success: true,
        data: entity,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        errors: [{ param: 'server', msg: 'Server error', value: error }],
      })
    }
  }

  create = async (req, res) => {
    try {
      if (this.validators.length > 0) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({
            success: false,
            errors,
          })
        }
      }

      const customErrors = await this.customValidate()
      if (customErrors.length > 0) {
        return res.status(400).json({
          success: false,
          errors: customErrors,
        })
      }
      let newModel = this.generateCustomModel()
      if (!newModel) {
        const model = {}
        const { paths } = this.model.schema
        for (const key in paths) {
          if (!this.expectPropertyName.includes(key)) {
            model[key] = req.body[key]
          }
        }

        newModel = new this.model({
          ...model,
        })
      }

      const savedModel = await newModel.save()
      return res.status(201).json({
        success: true,
        data: savedModel,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        errors: [{ param: 'server', msg: 'Server error', value: error }],
      })
    }
  }

  /**
   * Custom validate
   * @returns errors
   */
  customValidate = async () => {
    return []
  }

  /**
   * Generate custom model
   * @returns custom model
   */
  generateCustomModel = () => {
    return null
  }
}

export default BaseController
