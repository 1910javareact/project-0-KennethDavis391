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