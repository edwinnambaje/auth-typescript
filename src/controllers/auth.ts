import express from 'express';
import { createUser, getUserByEmail } from '../db/user';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use"
            });
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });
        return res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
};
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "email or password is required"
            });
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!user) return res.status(404).json({ message: "User not found" });
        const expectedhash = authentication(user.authentication.salt, password)

        if (user.authentication.password !== expectedhash)
            return res.status(400).json({ message: "Invalid password" });
        const salt = random();
        user.authentication.sessionKey = authentication(salt, user._id.toString())
        await user.save();
        res.cookie('Edwin-Authentication', user.authentication.sessionKey, { domain: 'localhost', path: '/' });
        res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
};