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

//getting a user by Id, accessable by finance managers, and the user with that id
usersRouter.get('/:id',authorization([1],true),
(req,res) =>{
    let id = +req.params.id
    if(isNaN(id)){
        res.status(400).send('Invalid Id')
    }else{
        try{
            let user = userServices.getUserById(id)
            if(user){
                res.json(user)
            }else{
                res.status(500).send('Could not find user')
            }
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }


})