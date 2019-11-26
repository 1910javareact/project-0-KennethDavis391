import express from 'express';
import { authorization } from '../middleware/authorization-middleware';
import * as reimbursementsServices from '../services/reimbursements-services';

export const reimbursementsRouter = express.Router();

// finding reimbursements by status
reimbursementsRouter.get('/status/:statusId', authorization([1]),
    async (req, res) => {
        const statusId = +req.params.statusId;
        if (isNaN(statusId)) {
            res.status(400).send('Invalid statusId');
        } else {
            try {
                const reimbursements = await reimbursementsServices.getReimbursementsByStatusId(statusId);
                res.json(reimbursements);
            } catch (e) {
                res.status(e.status).send(e.message);
            }
        }
    });

// get reimbursements by userId
reimbursementsRouter.get('/author/userId/:userId', authorization([1], true),
    async (req, res) => {
        const userId = +req.params.userId;
        if (isNaN(userId)) {
            res.status(400).send('Invalid userId');
        } else {
            try {
                const reimbursements = await reimbursementsServices.getReimbursementsByUserId(userId);
                res.json(reimbursements);
            } catch (e) {
                res.status(e.status).send(e.message);
            }
        }
    });

// submit a riembursement, date submitted will be handled in the database
// amount description and type are all that are required
reimbursementsRouter.post('', authorization([1, 2, 3]),
    async (req, res) => {
        const { body } = req;
        const post = {
            author: req.session.user.userId,
            amount: body.amount,
            description: body.description,
            type: body.type
        };
        for (const key in post) {
            if (!post[key]) {
                res.status(400).send('Please inclued all fields');
            }
        }
        try {
            const newPost = await reimbursementsServices.postReimbersement(post);
            res.status(201).json(newPost);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    });

// update a reimbursement
// only admins are allowed to update a request, and only approve or deny them
// only a status and reimbursementId is required
reimbursementsRouter.patch('', authorization([1]),
    async (req, res) => {
        const { body } = req;
        const patch = {
            reimbursementId: body.reimbursementId,
            resolver: req.session.user.userId,
            status: body.status
        };
        for (const key in patch) {
            if (!patch[key]) {
                res.status(400).send('Please include a status and reimbursement Id');
            }
        }
        try {
            const newPost = await reimbursementsServices.patchReimbersement(patch);
            res.status(201).json(newPost);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    });