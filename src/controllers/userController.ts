import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { NotFoundError, BadRequestError } from '../utils/errorClasses';
import { CreateUserRequest, UpdateUserRequest, UserResponse } from '../interfaces/userInterface';

// Get all users
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {

        const users: UserResponse[] = await User.find();
        

        // Get all users from the database
        res.status(200).json({
        status: 'success',
        data: {
            users: users
        }
        });
    } catch (error) {
        next(error);
    }
    };

// Get a specific user
export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {

        const user = await User.findById(req.params.id);  

        if (!user) {
            return next(new NotFoundError(`User with ID ${req.params.id} not found`));
        }

        // Get the user with the specified ID
        res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
        });
    } catch (error) {
        next(error);
    }
    }

// Create a new user
export const createUser = async (
    req: Request<{}, {}, CreateUserRequest>,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {

        const { username, email, password } = req.body;

        // check if the user already exists using email
        const userExists = await User.exists({email:email});
        if(userExists){
            return next(new BadRequestError('User already exists'));
        }

        const newUser = await User.create({
            username,
            email,
            password
        });

        // Create a new user in the database
        res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
        });
    } catch (error) {
        next(error);
    }
    };

// Update a user
export const updateUser = async (
    req: Request<{id:string}, {}, UpdateUserRequest>,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
        
        const { username, email } = req.body;

        // check if the user already exists using email
        const updateUser= await User.findByIdAndUpdate(
            req.params.id,
            {username, email},
            {
                new:true,
                runValidators:true
                
            }
        
        );
        if (!updateUser) {
            return next(new NotFoundError(`User with ID ${req.params.id} not found`));

        }

        // Update the user with the specified ID
        res.status(200).json({
        status: 'success',
        data: {
            user: updateUser
        }
        });
    } catch (error) {
        next(error);
    }
    };

// Delete a user
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return next(new NotFoundError(`User with ID ${req.params.id} not found`));
        }
        // Delete the user with the specified ID
        res.status(204).json({
        status: 'success',
        message: 'User deleted',
        data: null
        });

    } catch (error) {
        next(error);
    }
    };

