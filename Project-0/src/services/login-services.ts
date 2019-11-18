import { daoGetUser } from "../repositories/login-dao";



export function getUser(username:string, password:string){
    daoGetUser(username, password)
}