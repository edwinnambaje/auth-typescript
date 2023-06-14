import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionKey } from '../db/user';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const session = req.cookies['Edwin-Authentication'];
        if (!session) {
            return res.status(403).json({ message: "Please Login" });
        }
        const existingUser = await getUserBySessionKey(session)
        if (!session) {
            return res.status(403).json({ message: "Please Login" });
        }
        merge(req, { identity: existingUser })
        return next();

    } catch (error) {
        console.log(error)
        return res.status(400);
    }
}