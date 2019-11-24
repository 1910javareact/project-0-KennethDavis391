import { Reimbursement } from "../models/reimbursement";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { multiReimbursementDTOtoReimbursement } from "../util/ReimbursementDTO-to-Reimbursemtent";

//get the reimbursements with a given status Id
export async function daoGetReimbursementsByStatusId(statusId: number){
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.reimbursement NATURAL JOIN project_0.reimbursement_status NATURAL JOIN project_0.reimbursement_type WHERE status_id = $1',
        [statusId])
        if(result.rowCount === 0){
            throw 'No Reimbursements By That Status'
        }else{
            return multiReimbursementDTOtoReimbursement(result.rows)
        }
    } catch (e) {
        if(e === 'No Reimbursements By That Status'){
            throw {
                status: 404,
                message: 'No Reimbursements By That Status'
            }
        }else{
            throw{
                status:500,
                Message: 'something went wrong with the server, try again later'
            }
        }
        
    } finally {
        client.release()
    }
}

//find reimbursements by user id and return the array
export function daoGetReimbursementsByUserId(userId: number){
    // let filteredReimbursements = [...reimbursements]
    // try{
    //     filteredReimbursements = filteredReimbursements.filter((ele,index,arr)=>{
    //         if(userId === ele.author){
    //             return true
    //         }else{
    //             return false
    //         }
    //     })
    // }catch{
    //     throw{
    //         status:500,
    //         Message: 'something went wrong with the server, try again later'
    //     }
    // }
    // return filteredReimbursements
}

//make a new reimbersement request
export function daoPostReimbersement(post){
    // post.reimbursementId = reimbursementId
    // post.dateResolved = -1
    // post.resolver = null
    // post.status = 1

    // reimbursementId++

    // reimbursements.push(post)

    // return post
}

//get a reimbersement by it's id
export function daoGetReimbursementsByReimbursementId(reimbursementId: number){
    // for(let reimbursement of reimbursements){
    //     if(reimbursement.reimbursementId === reimbursementId){
    //         return reimbursement
    //     }
    // }
    // throw{
    //     status: 404,
    //     message: 'ReimbursementId not found'
    // }
}

//replace a reimbersemnt by it's id
export function daoReplaceReimbursement(reimbursementUpdate: Reimbursement){
    // for(let reimbursement of reimbursements){
    //     if(reimbursementUpdate.reimbursementId === reimbursement.reimbursementId){
    //         reimbursement = reimbursementUpdate
    //         return
    //     }
    // }
    // throw{
    //     status: 404,
    //     message: 'ReimbursementId not found'
    // }
}