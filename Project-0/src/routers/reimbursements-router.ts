import express from "express"
import { authorization } from "../middleware/authorization-middleware"
import * as reimbursementsServices from "../services/reimbursements-services"
import { loggingMiddleware } from "../middleware/logging-middleware"

export const reimbursementsRouter = express.Router()

//finding reimbursements by status
reimbursementsRouter.get('/status/:statusId', authorization([1]), loggingMiddleware,
    async (req, res) => {
        let statusId = +req.params.statusId
        if (isNaN(statusId)) {
            res.status(400).send('Invalid statusId')
        } else {
            try {
                let reimbursements = await reimbursementsServices.getReimbursementsByStatusId(statusId)
                res.json(reimbursements)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        }
    })

//get reimbursements by userId
reimbursementsRouter.get('/author/userId/:userId', authorization([1], true), loggingMiddleware,
    async (req, res) => {
        let userId = +req.params.userId
        if (isNaN(userId)) {
            res.status(400).send('Invalid userId')
        } else {
            try {
                let reimbursements = await reimbursementsServices.getReimbursementsByUserId(userId)
                res.json(reimbursements)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        }
    })

//submit a riembursement, date submitted will be handled in the database
//amount description and type are all that are required
reimbursementsRouter.post('', authorization([1, 2, 3]), loggingMiddleware,
    async (req, res) => {
        let { body } = req
        let post = {
            author: req.session.user.userId,
            amount: body.amount,
            description: body.description,
            type: body.type
        }
        for (let key in post) {
            if (!post[key]) {
                res.status(400).send('Please inclued all fields')
            }
        }
        try {
            let newPost = await reimbursementsServices.postReimbersement(post)
            res.status(201).json(newPost)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    })

//update a reimbursement
reimbursementsRouter.patch('', authorization([1]), loggingMiddleware,
    (req, res) => {
        let { body } = req
        try {
            let patch = {
                reimbursementId: body.reimbursementId,
                dateResolved: 10,
                resolver: req.session.user.userId,
                status: body.status
            }
            for (let key in patch) {
                if (patch[key] === undefined) {
                    throw Error
                }
            }
            try {
                let newPost = reimbursementsServices.patchReimbersement(patch)
                res.status(201).json(newPost)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        } catch{
            res.status(400).send('Please include a status and reimbursement Id')
        }
    })