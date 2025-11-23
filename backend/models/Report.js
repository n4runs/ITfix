
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  status: { type: String, default: 'pending' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
