import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../interfaces/categoryInterface';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      maxlength: [50, 'Category name cannot be more than 50 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Description cannot be more than 200 characters']
    },
    color: {
      type: String,
      default: '#3498db' // Default blue color
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A category must belong to a user']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;