import * as userDao from "../repositories/user-dao";
import { User } from "../models/user";


//call the username and password check from the repository layer, no manipulation required for this request
export function getUserByUsernameAndPassword(username:string, password:string){
    return userDao.daoGetUserByUsernameAndPassword(username, password)
}

//call the daoGetUsers function from user-dao, no manipulation required for this request
export function getUsers(){
    return userDao.daoGetUsers()
}

//call the daoGetUserById function from user-dao, no manipulation required for this request
export function getUserById(id: number){
    return userDao.daoGetUserById(id)
}

//update user from user Id, fianly something to do in the service layer
export function updateUser(req: User){
    let user = userDao.daoGetUserById(req.userId)
    for(let key in req){
        if(req[key] !== undefined){
            user[key] = req[key]
        }
    }
    return userDao.daoUpdateUser(user)
}