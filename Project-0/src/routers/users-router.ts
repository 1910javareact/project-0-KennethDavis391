import express from "express"
import { authorization } from "../middleware/authorization-middleware"
import * as userServices from "../services/user-services"

export const usersRouter = express.Router()

//geting all users, only accessable by finance managers
usersRouter.get('',authorization([1]),
async (req,res)=>{
    try{
        let users = await userServices.getUsers()
        res.json(users)
    }catch(e){
        res.status(e.status).send(e.message)
    }
    
})

//getting a user by Id, accessable by finance managers, and the user with that id
usersRouter.get('/:id',authorization([1],true),
async (req,res) =>{
    let id = +req.params.id
    if(isNaN(id)){
        res.status(400).send('Invalid Id')
    }else{
        try{
            let user = await userServices.getUserById(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }


})

//update user info, only accessable by Admins
usersRouter.patch('',authorization([2]),
(req,res)=>{
    try{
        let {body} = req
        let user = userServices.updateUser(body)
        if(user){
            res.status(200).json(user)
        }else{
            res.status(400).send('User not found')
        }
    }catch(e){
        res.status(e.status).send(e.message)
    }
})