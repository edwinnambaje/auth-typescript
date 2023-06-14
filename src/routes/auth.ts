import express from 'express';
import { deleteser, getAll, getOneUser, updateUser } from '../controllers/users';
import { isAuthenticated } from '../middleware/index';


export default (router: express.Router) => {
    router.get('/users/all', isAuthenticated, getAll);
    router.get('/users/:id', isAuthenticated, getOneUser);
    router.delete('/users/:id', isAuthenticated, deleteser);
    router.patch('/user/update/:id', isAuthenticated, updateUser);
}