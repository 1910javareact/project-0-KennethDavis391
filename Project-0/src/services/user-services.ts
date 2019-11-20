import { daoGetUserByUsernameAndPassword } from "../repositories/user-dao";


//call the username and password check from the repository layer, no manipulation required for this request
export function getUserByUsernameAndPassword(username:string, password:string){
    daoGetUserByUsernameAndPassword(username, password)
}