import express from 'express';
import { authorization } from '../middleware/authorization-middleware';
import * as userServices from '../services/user-services';
import { loggingMiddleware } from '../middleware/logging-middleware';

export const usersRouter = express.Router();

// geting all users, only accessable by finance managers
usersRouter.get('', authorization([1]), loggingMiddleware,
async (req, res) => {
    try {
        const users = await userServices.getUsers();
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }

});

// getting a user by Id, accessable by finance managers, and the user with that id
usersRouter.get('/:userId', authorization([1], true), loggingMiddleware,
async (req, res) => {
    const userId = +req.params.userId;
    if (isNaN(userId)) {
        res.status(400).send('Invalid Id');
    } else {
        try {
            const user = await userServices.getUserById(userId);
            res.json(user);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }


});

// update user info, only accessable by Admins
usersRouter.patch('', authorization([2]), loggingMiddleware,
async (req, res) => {
    try {
        const {body} = req;
        const user = await userServices.updateUser(body);
        res.status(200).json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});