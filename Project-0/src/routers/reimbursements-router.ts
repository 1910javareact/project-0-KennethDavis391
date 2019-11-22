import express from "express"
import { authorization } from "../middleware/authorization-middleware"
import * as reimbursementsServices from "../services/reimbursements-services"

export const reimbursementsRouter = express.Router()

//finding reimbursements by status
reimbursementsRouter.get('/status/:statusId',authorization([1]), 
(req,res)=>{
    let statusId = +req.params.statusId
    if(isNaN(statusId)){
        res.status(400).send('Invalid statusId')
    }else{
        try{
            let reimbursements = reimbursementsServices.getReimbursementsByStatusId(statusId)
            if(!reimbursements){
                res.status(500).send('Something went wrong with the server, try again later')
            }
            res.json(reimbursements)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

//get reimbursements by userId
reimbursementsRouter.get('/author/userId/:userId',authorization([1], true), 
(req,res)=>{
    let userId = +req.params.userId
    if(isNaN(userId)){
        res.status(400).send('Invalid userId')
    }else{
        try{
            let reimbursements = reimbursementsServices.getReimbursementsByUserId(userId)
            if(!reimbursements){
                res.status(500).send('Something went wrong with the server, try again later')
            }
            res.json(reimbursements)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

//submit a riembursement
reimbursementsRouter.post('',authorization([1,2,3]),
(req,res)=>{
    let {body} = req
    try{
        let post = { //still lets you not include fields
	        author: req.session.user.userId,
            amount: body.amount,
            dateSubmitted: 10,//update later to depend on the time the request was submited
            description: body.description,
            type: body.type
        }
        for (let key in post){
            if (post[key] === undefined){
                throw Error
            }
        }
        try{
            let newPost = reimbursementsServices.postReimbersement(post)
            res.status(201).json(newPost)
        }catch(e){
            res.status(e.status).send(e.message)
        }
        
    }catch{
        res.status(400).send('Please include all request fields')
    }
})

//update a reimbursement
reimbursementsRouter.patch('', authorization([1]), 
(req,res)=>{
    let {body} = req
    try{
        let patch = {
            reimbursementId: body.reimbursementId,
            dateResolved: 10,
            resolver: req.session.user.userId,
            status: body.status
        }
        for (let key in patch){
            if (patch[key] === undefined){
                throw Error
            }
        }
        try{
            let newPost = reimbursementsServices.patchReimbersement(patch)
            res.status(201).json(newPost)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }catch{
        res.status(400).send('Please include a status and reimbursement Id')
    }
})