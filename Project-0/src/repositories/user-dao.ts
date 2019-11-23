import { users } from "../database";
import { User } from "../models/user";
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { userDTOtoUser } from "../util/UserDTO-to-User";


//see if there is a user with a username and password that match what was input for login, if so return the user
export async function daoGetUserByUsernameAndPassword(username:string, password:string):Promise<User>{
    let client: PoolClient
    try{
        
        client = await connectionPool.connect()//error thrown here
        
        let result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role WHERE username = $1 and password = $2',
            [username,password])
        if (result.rowCount === 0) {
            throw 'Invalid Credentials'
        } else {
            return userDTOtoUser(result.rows)
        }
    } catch(e) {
        console.log(e);
        
        if (e === 'Invalid Credentials'){
            throw{
                status: 401,
                message: "Invalid Credentials"
            }
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            }
        }
    } finally {
        client && client.release()
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

//update a user in the database and return the updated user
export function daoUpdateUser(newUser: User){
    for( let user of users){
        if (user.userId === newUser.userId){
            user = newUser
            return user
        }
    }
    throw{
        status: 404,
        message: 'User not found'
    }
}