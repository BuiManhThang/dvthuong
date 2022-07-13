import mongoose from 'mongoose'

const { Schema } = mongoose

const carSchema = new Schema(
  {
    name: { type: String, maxLength: 256, required: true },
    banner: { type: String, required: true },
    slogan: { type: String, required: true },
    subSlogan: { type: String, required: true },
    deposit: { type: Number, required: true },
    price: { type: Number, required: true },
    manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
    imgs: [{ type: String, default: '' }],
    overall: {
      title: { type: String, default: '' },
      desc: { type: String, default: '' },
      img: { type: String, default: '' },
    },
    colors: [
      {
        colorName: { type: String, default: '' },
        color: { type: String, default: '' },
        img: { type: String, default: '' },
      },
    ],
    furniture: {
      title: { type: String, default: '' },
      desc: { type: String, default: '' },
      img: { type: String, default: '' },
    },
    exterior: {
      title: { type: String, default: '' },
      desc: { type: String, default: '' },
    },
    operation: {
      title: { type: String, default: '' },
      desc: { type: String, default: '' },
      img: { type: String, default: '' },
    },
    detail: {
      engineType: { type: String, default: '' },
      gear: { type: String, default: '' },
      cylinderCapacity: { type: Number, default: 0 },
      wattage1: { type: Number, default: 0 },
      wattage2: { type: Number, default: 0 },
      torque1: { type: Number, default: 0 },
      torque2: { type: Number, default: 0 },
      torque3: { type: Number, default: 0 },
      fuelCapaciry: { type: Number, default: 0 },
      fuelSystem: { type: String, default: '' },
      comsumption: { type: Number, default: 0 },
      seats: { type: Number, default: 0 },
      length: { type: Number, default: 0 },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
      baseLength: { type: Number, default: 0 },
      baseWidthFront: { type: Number, default: 0 },
      baseWidthBack: { type: Number, default: 0 },
      weight: { type: Number, default: 0 },
      totalWeight: { type: Number, default: 0 },
      brakeFront: { type: String, default: '' },
      brakeBack: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Car', carSchema)
