import mongoose from 'mongoose'
const { Schema } = mongoose

const manufacturerSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, maxLength: 256, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Manufacturer', manufacturerSchema)
