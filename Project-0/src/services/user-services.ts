import * as userDao from "../repositories/user-dao";


//call the username and password check from the repository layer, no manipulation required for this request
export function getUserByUsernameAndPassword(username:string, password:string){
    return userDao.daoGetUserByUsernameAndPassword(username, password)
}

//call the daoGetUsers function from user-dao, no manipulation required for this request
export function getUsers(){
    return userDao.daoGetUsers()
}