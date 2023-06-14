import express from 'express';
import { deleteUser, getUserById, getUsers } from '../db/user';

export const getAll = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUsers()
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
};
export const deleteser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        await deleteUser(id)
        return res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
};
export const getOneUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const user = await getUserById(id)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            message: "User retrieved successfully",
            user
        });

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
};
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { username, email } = req.body;
        const user = await getUserById(id)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        user.email = email;
        user.username = username;
        await user.save();

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
};