import mongoose, { Schema } from 'mongoose';
import { INote } from '../interfaces/noteInterface';
import User from '../models/userModel'; // Import user interface



const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A note must belong to a user']
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Note = mongoose.model<INote>('Note', noteSchema);

export default Note;