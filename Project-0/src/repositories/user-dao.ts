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

//get all users from the database
export function daoGetUsers(){
    return users
}

//get a user from the database based on Id
export function daoGetUserById(id: number){
    for( let user of users){
        if (user.userId === id){
            return user
        }
    }
    throw{
        status: 404,
        message: 'User not found'
    }
}