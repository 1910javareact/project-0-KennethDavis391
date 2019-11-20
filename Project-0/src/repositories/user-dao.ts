import { users } from "../database";


//see if there is a user with a username and password that match what was input for login
export function daoGetUserByUsernameAndPassword(username:string, password:string){
    for (let user of users){
        if(username === user.username && password === user.password){
            return user
        }
    }
    throw{
        status: 400,
        message: "Invalid Credentials"
    }
}