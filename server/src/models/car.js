import mongoose from 'mongoose'

const { Schema } = mongoose

const carSchema = new Schema(
  {
    name: { type: String, maxLength: 256, required: true },
    banner: { type: String, required: true },
    slogan: { type: String, required: true },
    deposit: { type: Number, required: true },
    price: { type: Number, required: true },
    manufacture: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
    imgs: [{ type: String }],
    overall: {
      title: { type: String },
      desc: { type: String },
      img: { type: String },
    },
    colors: [
      {
        colorName: { type: String },
        color: { type: String },
        img: { type: String },
      },
    ],
    furniture: {
      title: { type: String },
      desc: { type: String },
      img: { type: String },
    },
    exterior: {
      title: { type: String },
      desc: { type: String },
    },
    operation: {
      title: { type: String },
      desc: { type: String },
      img: { type: String },
    },
    detail: {
      engineType: { type: String },
      gear: { type: String },
      cylinderCapacity: { type: Number },
      wattage1: { type: Number },
      wattage2: { type: Number },
      torque1: { type: Number },
      torque2: { type: Number },
      torque3: { type: Number },
      fuelCapaciry: { type: Number },
      fuelSystem: { type: String },
      comsumption: { type: Number },
      seats: { type: Number },
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      baseLength: { type: Number },
      baseWidthFront: { type: Number },
      baseWidthBack: { type: Number },
      weight: { type: Number },
      totalWeight: { type: Number },
      brakeFront: { type: String },
      brakeBack: { type: String },
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Car', carSchema)
