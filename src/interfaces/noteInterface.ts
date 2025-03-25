import { ICategory } from './categoryInterface';
// models/noteModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import User from '../models/userModel'; // Import user interface

export interface INote {
  title: string;
  content: string;
  category?: ICategory | string; // Can be either a category object or a category ID
  user:mongoose.Types.ObjectId; //add user reference
  createdAt: Date;
  updatedAt: Date;
}

export interface INoteDocument extends INote, Document {
  _id: string;
}



// For typed request validation
export interface CreateNoteRequest {
  title: string;
  content: string;
  categoryId?: string;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  categoryId?: string;
}

// For typed responses
export interface NoteResponse {
  _id: string;
  title: string;
  content: string;
  category?: ICategory;
  createdAt: Date;
  updatedAt: Date;
  user:string;
}