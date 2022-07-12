import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    fullName: { type: String, maxLength: 80, required: true },
    email: { type: String, maxLength: 256, required: true },
    phoneNumber: { type: String, maxLength: 10, minLength: 10, required: true },
    avatar: { type: String, default: 'default-avatar.jpg' },
    address: {
      landmark: { type: String },
      cipy: { type: String },
    },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)
