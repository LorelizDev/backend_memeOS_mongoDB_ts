import mongoose, { Schema, Model } from 'mongoose';
import { IMeme } from '../interfaces/memeInterfaces';

const memeSchema: Schema<IMeme> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, 
{ 
  timestamps: false,
  versionKey: false,
  toJSON: {
    transform: (doc, obj) => {
      obj.id = obj._id;
      obj.date = obj.date.toISOString().split('T')[0]; // Formatear la fecha
      delete obj._id;
      return obj;
    }
  }
});


const memeModel: Model<IMeme> = mongoose.model<IMeme>('Meme', memeSchema);

export default memeModel;
