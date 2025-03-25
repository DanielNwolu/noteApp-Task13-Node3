import { Request, Response, NextFunction } from 'express';
import Category from '../models/categoryModel';
import { NotFoundError, BadRequestError , ForbiddenError} from '../utils/errorClasses';
import { CreateCategoryRequest , CategoryResponse} from '../interfaces/categoryInterface';
import { getUserIdFromResponse } from '../utils/authUtils';


// Create a new category
export const createCategory = async (
  req: Request<{}, {}, CreateCategoryRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

     // Use the utility function instead of direct access
    const userId = getUserIdFromResponse(res);
    const { name, description, color } = req.body;
    const categories = await Category.find({user:userId});
    if (!name) {
      return next(new BadRequestError('Category name is required'));
    }
    for (const category of categories) {
      if(name == category.name){
        return next(new BadRequestError("This category name already exists"));
      }
    }
    const newCategory = await Category.create({
      name,
      description,
      color,
      user:userId
    });
    
    res.status(201).json({
      status: 'success',
      message:"New category created successfully",
      data: {
        category: newCategory
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all categories
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = getUserIdFromResponse(res);
    const categories: CategoryResponse[] = await Category.find({user:userId});
    
    res.status(200).json({
      status: 'success',
      results: categories.length,
      message: "user note categories retrived successfully",
      data: {
        categories
      }
    });
  } catch (error) {
    next(error);
  }
};