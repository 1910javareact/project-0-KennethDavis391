import express from "express"
import { authorization } from "../middleware/authorization-middleware"
import * as userServices from "../services/user-services"


export const usersRouter = express.Router()

//geting all users, only accessable by finance managers
usersRouter.get('',authorization([1]),
(req,res)=>{
    try{
        let users = userServices.getUsers()
        if (users){
            res.json(users)
        }else{
            res.status(500).send('Could not find users')
        }
    }catch(e){
        res.status(e.status).send(e.message)
    }
    
})
