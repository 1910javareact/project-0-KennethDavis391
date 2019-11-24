import { users } from "../database";
import { User } from "../models/user";
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOtoUser } from "../util/UserDTO-to-User";


//see if there is a user with a username and password that match what was input for login, if so return the user
export async function daoGetUserByUsernameAndPassword(username:string, password:string):Promise<User>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        
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

//get all users from the database, return them in an array
export async function daoGetUsers(){
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        
        let result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role')
        if(result.rowCount === 0){
            throw 'No users in database'
        } else {
            return multiUserDTOtoUser(result.rows)
        }
    } catch(e) {
        if(e === 'No users in database'){
            throw{
                status: 400,
                message: 'No users in database'
            }
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    } finally {
        client.release()
    }
}

//get a user from the database based on Id
export async function daoGetUserById(id: number){
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role WHERE user_id = $1',
        [id])        
        if(result.rowCount === 0){
            throw 'User does not exist'
        }else{
            
            return userDTOtoUser(result.rows)
        }
    }catch(e){
        if (e === 'User does not exist'){
            throw{
                status: 404,
                message: 'User not found'
            }
        }else{
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }finally{
        client.release()
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