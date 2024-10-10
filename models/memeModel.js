import mongoose from 'mongoose';

const memeSchema = new mongoose.Schema({
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


const Meme = mongoose.model('Meme', memeSchema);

export default Meme;
