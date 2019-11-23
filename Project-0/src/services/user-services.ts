import * as userDao from "../repositories/user-dao";
import { User } from "../models/user";


//call the username and password check from the repository layer, no manipulation required for this request
export function getUserByUsernameAndPassword(username:string, password:string): Promise<User>{
    try{
        return userDao.daoGetUserByUsernameAndPassword(username, password)
    }catch(e){
        throw(e)
    }
}

//call the daoGetUsers function from user-dao, no manipulation required for this request
export function getUsers(){
    return userDao.daoGetUsers()
}

//call the daoGetUserById function from user-dao, no manipulation required for this request
export function getUserById(id: number){
    return userDao.daoGetUserById(id)
}

//update user from user Id, fianlly something to do in the service layer
export function updateUser(req: User){
    let user = userDao.daoGetUserById(req.userId)
    for(let key in req){
        if(req[key] !== undefined && user.hasOwnProperty(key)){
            user[key] = req[key]
        }
    }
    return userDao.daoUpdateUser(user)
}