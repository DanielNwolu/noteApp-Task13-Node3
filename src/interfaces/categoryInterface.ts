import mongoose, { Schema, Document } from 'mongoose';


export interface ICategory {
    _id?: string;
    name: string;
    description?: string;
    color?: string;
    user:mongoose.Types.ObjectId; //add user reference
  }
  
export interface ICategoryDocument extends ICategory, Document {
  _id: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  color?: string;
}

// For typed responses
export interface CategoryResponse {
  _id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
  user:string;
}