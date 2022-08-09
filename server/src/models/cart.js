import mongoose from 'mongoose'

const { Schema } = mongoose

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Cart', cartSchema)
