import mongoose from 'mongoose'
import monggose, { Schema } from 'mongoose'
const logSchema = new Schema(
  {
    eamil: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
const Log = mongoose.models.Log || mongoose.model('Log', logSchema)
export default Log
