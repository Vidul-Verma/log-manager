import { Schema, model } from 'mongoose';

const logSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  location: { type: String, required: true },
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

const Log = model('Log', logSchema);
export default Log;